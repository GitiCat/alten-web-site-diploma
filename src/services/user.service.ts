import * as bcrypt from 'bcrypt'
import chalk from 'chalk'
import * as jwt from 'jsonwebtoken'
import db from '../sequelize/index'

class UserService {
    private readonly _saulRound: number = 12
    private readonly _jwtSecret: string = '0.rfyj3n9nzh'

    async register(login: string, password: string, username: string) {
        const salt: string = await bcrypt.genSalt(this._saulRound)
        const hash = await bcrypt.hash(password, salt)
        
        return db.Users.create({
            login: login,
            password: hash,
            username: username,
        }).then(user => this.getUserById(user!.id))
    }

    async login(login: string) {
        const user = await db.Users.findOne({ where: { login: login } })
        const { id, login: userLogin } = user

        return {
            token: jwt.sign({ id, userLogin }, this._jwtSecret),
            username: userLogin
        }
    }

    verifyJwtToken(token: string) {
        return new Promise(resolve => {
            token.length === 0 && resolve(false)

            jwt.verify(token, this._jwtSecret, (error: jwt.VerifyErrors, decode: object) => {
                if(error) {
                    resolve(false)
                    return
                }

                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    async getOrCreateUser(login: string, password: string, username: string): Promise<boolean> {
        const salt: string = await bcrypt.genSalt(this._saulRound)
        const hash = await bcrypt.hash(password, salt)

        const user = await db.Users.findOne({where: { login: login }})
        console.log(chalk.cyan(`[DATABASE]: Checking user ${login} for existence...`));

        if(!user) {
            const user = await db.Users.create({
                login: login,
                password: hash,
                username: username
            })

            if(user) {
                console.log(chalk.green(`[DATABASE]: User ${user.login} has been successfully created.`))
                return Promise.resolve(true)
            } else {
                console.log(chalk.red(`[DATABASE]: An error occurred while creating a user...`))
                return Promise.resolve(false)
            }
        }

        console.log(chalk.green(`[DATABASE]: User ${login} is exist.`));
        return Promise.resolve(true)
    }

    getUserById(id: number) {
        return db.Users.findByPk(id)
    }
}

export default UserService
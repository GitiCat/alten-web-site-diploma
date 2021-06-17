import * as bcrypt from 'bcrypt'
import chalk from 'chalk'
import * as jwt from 'jsonwebtoken'
import db from '../sequelize/index'

class UserService {
    private _jwtSecretKey: string = process.env.JWT_SECRET_KEY as string
    private _saulRound: number = parseInt(process.env.JWT_SALT_ROUND)

    createJwt = (id: number, login: string): Promise<string> => {
        return Promise.resolve(jwt.sign({ id, login }, this._jwtSecretKey, {
            expiresIn: '24h'
        }))
    }

    verifyJwtToken(token: string) {
        return new Promise(resolve => {
            token.length === 0 && resolve(false)

            jwt.verify(token, this._jwtSecretKey, (error: jwt.VerifyErrors, decode: object) => {
                if (error) {
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

        const user = await db.Users.findOne({ where: { login: login } })
        console.log(chalk.cyan(`[DATABASE]: Checking user ${login} for existence...`));

        if (!user) {
            const user = await db.Users.create({
                login: login,
                password: hash,
                username: username
            })

            if (user) {
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
}

export default UserService
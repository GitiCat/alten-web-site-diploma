import * as bcrypt from 'bcrypt'
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
            token: jwt.sign({ id, userLogin }, this._jwtSecret)
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

    getUserById(id: number) {
        return db.Users.findByPk(id)
    }
}

export default UserService
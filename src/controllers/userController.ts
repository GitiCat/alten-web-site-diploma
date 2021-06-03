import { Request, Response, NextFunction } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ModelCtor } from 'sequelize/types'
import { IUserInstance } from '../sequelize/models/user-model'
import ApiError from '../error/ApiError'
import db from '../sequelize/index'

class UserController {
    private _hashPasswordSaltRound: number = 5
    private _jwtSecretKey: string = '0.fd7s74828'
    private _model: ModelCtor<IUserInstance>

    constructor() {
        this._model = db.Users
    }
    
    loginGET(req: Request, res: Response, next: NextFunction) {
        res.render('login', {
            title: 'Авторизация',
            layout: 'authLayout'
        })
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const error: Result<ValidationError> = validationResult(req)
        if(!error.isEmpty()) res.json(error)

        const { login } = req.body

        const user = await this._model.findOne({where: {login}})
        const token = this.generateJwt(user.id, login)
        return res.status(200).json({token: token, username: user.username})
    }
    
    async registration(req: Request, res: Response, next: NextFunction) {
        const error: Result<ValidationError> = validationResult(req)
        if(!error.isEmpty()) return next(ApiError.badRequest(`${error.array({onlyFirstError: true})}`))
        
        const { login, password, username } = req.body

        try {
            const hashPassword = await bcrypt.hash(password, this._hashPasswordSaltRound)
            const user = await this._model.create({login: login, password: hashPassword, username: username})
            const token = this.generateJwt(user.id, login)
            
            return res.status(200).json({token: token})
        } catch(error) {
            next(ApiError.badRequest(`New user creation error\n${error}`))
        }
    }

    private generateJwt(id: number, login: string) {
        return jwt.sign({
            id: id,
            login
        },this._jwtSecretKey, {
            expiresIn: '24h'
        })
    }
}

export default UserController
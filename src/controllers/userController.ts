import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import {
    Result,
    ValidationError,
    validationResult
} from 'express-validator/check'
import db from '../sequelize/index'
import { IUserInstance } from '../sequelize/models/user-model'

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY

/**
 * Generate json web token
 * @param id user id
 * @param login user login
 * @returns Generated json web token
 */
const createJwt = (id: number, login: string): Promise<string> => {
    return Promise.resolve(jwt.sign({ id, login }, JWT_SECRET_KEY, {
        expiresIn: '24h'
    }))
}

const UserController = () => {
    const loginGET = (req: Request, res: Response) => {
        res.render('login', {
            title: 'Авторизация',
            layout: 'authLayout'
        })
    }

    const login = async (req: Request, res: Response, next: NextFunction) => {
        const error: Result<ValidationError> = validationResult(req)
        if (!error.isEmpty()) return next(res.status(400).json(error.array()[0]))

        const { login } = req.body

        const user: IUserInstance = await db.Users.findOne({ where: { login: login } })
        const token: string = await createJwt(user.id, login)

        res.status(200).json({ token: token, username: user.username })
    }

    const register = async (req: Request, res: Response, next: NextFunction) => {
        const error: Result<ValidationError> = validationResult(req)
        if(!error.isEmpty()) return next(res.status(400).json(error.array()[0]))

        const { login, password, username } = req.body

        try {
            const hashPassword: string = await bcrypt.hash(password, Number(process.env.JWT_SALT_ROUND))
            const user = await db.Users.create({login: login, password: hashPassword, username: username})
            res.status(201).json({user})
        } catch(error) {
            return next(res.status(500).json({error: error}))
        }
    }

    return {
        loginGET,
        login,
        register
    }
}

export default UserController
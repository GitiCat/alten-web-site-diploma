import { CookieOptions, NextFunction, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import {
    Result,
    ValidationError,
    validationResult
} from 'express-validator/check'
import db from '../sequelize/index'
import { IUserInstance } from '../sequelize/models/user-model'
import UserService from '../services/user.service'

const userService: UserService = new UserService()

const UserController = () => {
    const loginGETForm = (req: Request, res: Response) => {
        res.render('login', {
            title: 'Авторизация',
            layout: 'authLayout'
        })
    }

    const getAll = async (req: Request, res: Response) => {
        const users = await db.Users.findAll()
        res.status(200).json(users)
    }

    const getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.query
        if (!id) return next(res.status(400).json({ message: 'You must specify user ID' }))

        const user = await db.Users.findOne({ where: { id: id } })
        if (!user) return next(res.status(404).json({ message: `User with ${id} is not present in database` }))

        res.status(200).json(user)
    }

    const deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.query
        if (!id) return res.status(400).json({ message: 'You must specify user ID' })

        const result = await db.Users.destroy({ where: { id: id } })
        res.status(200).json(result)
    }

    const changeById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.query
        if (!id) return next(res.status(400).json({ message: 'You must specify user ID' }))

        const user = await db.Users.findOne({ where: { id: id } })
        if (!user) return next(res.status(404).json({ message: `User with ${id} is not present in database` }))

        const { login, password, username } = req.body
        res.status(200).json(user.update({ login: login, password: password, username: username }))
    }

    const login = async (req: Request, res: Response, next: NextFunction) => {
        const error: Result<ValidationError> = validationResult(req)
        if (!error.isEmpty()) return next(res.status(400).json(error.array()[0]))

        const { login } = req.body

        const user: IUserInstance = await db.Users.findOne({ where: { login: login } })
        const token: string = await userService.createJwt(user.id, login)

        const cookieOptions: CookieOptions = {
            path: '*',
            maxAge: 3600 * 24,
            httpOnly: true
        }
        
        res
            .status(200)
            .cookie('Authorization', token, cookieOptions)
            .cookie('auth_user', user.login, cookieOptions)
            .redirect('/admin')
    }

    const register = async (req: Request, res: Response, next: NextFunction) => {
        const error: Result<ValidationError> = validationResult(req)
        if (!error.isEmpty()) return next(res.status(400).json(error.array()[0]))

        const { login, password, username } = req.body

        try {
            const hashPassword: string = await bcrypt.hash(password, Number(process.env.JWT_SALT_ROUND))
            const user = await db.Users.create({ login: login, password: hashPassword, username: username })
            res.status(201).json({ user })
        } catch (error) {
            return next(res.status(500).json({ error: error }))
        }
    }

    return {
        loginGETForm,
        getAll,
        getById,
        deleteById,
        changeById,
        login,
        register
    }
}

export default UserController
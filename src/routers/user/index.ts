import { Router, Request, Response, CookieOptions } from 'express'
import { userRules } from '../../rules/user.rules'
import UserController from '../../controllers/userController'

export const userRouter: Router = Router()
const userController = new UserController()

userRouter.get('/login', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Вход',
        layout: 'authLayout'
    })
})

userRouter.post('/login', userRules.login, userController.login)
import { Router, Request, Response, CookieOptions } from 'express'
import { userRules } from '../../rules/user.rules'
import UserController from '../../controllers/userController'

export const userRouter: Router = Router()
const userController = UserController()

userRouter.get('/login', userController.loginGET)
userRouter.post('/login', userRules.login, userController.login)
userRouter.post('/register', userRules.register, userController.register)
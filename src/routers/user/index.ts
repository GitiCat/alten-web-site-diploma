import { Router } from 'express'
import { userRules } from '../../rules/user.rules'
import UserController from '../../controllers/userController'

export const userRouter: Router = Router()
const userController = UserController()

userRouter.get('/login', userController.loginGETForm)
userRouter.get('/users', userController.getAll)
userRouter.get('/users/:id', userController.getById),
userRouter.put('/users/:id', userController.changeById)
userRouter.delete('/users/:id', userController.deleteById)
userRouter.post('/login', userRules.login, userController.login)
userRouter.post('/register', userRules.register, userController.register)
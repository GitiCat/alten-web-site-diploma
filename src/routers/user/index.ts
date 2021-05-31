import { Router, Request, Response } from 'express'
import { matchedData } from 'express-validator/filter'
import { Result, ValidationError, validationResult } from 'express-validator/check'
import { userRules } from '../../rules/user.rules'
import UserService from '../../services/user.service'

export const userRouter: Router = Router()
const userService: UserService = new UserService()

userRouter.get('/login', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Вход',
        layout: 'authLayout'
    })
})

userRouter.post('/login', userRules.login, (req: Request, res: Response) => {
    const error: Result<ValidationError> = validationResult(req)
    
    if(!error.isEmpty()) return res.status(422).json(error.array())

    const payload = matchedData(req) as { login: string, password: string }
    const token = userService.login(payload.login)

    return token.then(result => res.json(result))
})
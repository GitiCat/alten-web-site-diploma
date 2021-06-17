import { Request, Response, NextFunction } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'
import { AccessDeniedMsg } from '../rules/auth.rules'

export const checkAuthValidator = (req: Request, res: Response, next: NextFunction) => {
    const route = req.originalUrl
    const error: Result<ValidationError> = validationResult(req)

    if(!error.isEmpty()) {
        if(new RegExp(/(\/admin)/gm).test(route)) {
            return next(res.status(401).redirect('/login'))
        } 

        if(new RegExp(/(\/api)/gm).test(route)) {
            return next(res.status(401).send(AccessDeniedMsg))
        }
    }
    
    return next()
}
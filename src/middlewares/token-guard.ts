import * as jwt from 'jsonwebtoken'
import { IncomingHttpHeaders } from 'http'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import UserService from '../services/user.service'

const userService = new UserService()

const getTokenFromHeaders = (headers: IncomingHttpHeaders): string => {
    const header: string = headers.authorization as string
    return !header ? header : header.split(' ')[1]
}

const TokenGuard: (() => RequestHandler) = (() => (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(req.headers)
        || req.cookies['auth_token']
        || req.query.token 
        || req.body.token 
        || ''
    const hasAccess: Promise<boolean> = userService.verifyJwtToken(token)

    hasAccess.then(access => {
        if(!access) return res.status(403).redirect(302, '/login')
        next()
    })
})

export default TokenGuard
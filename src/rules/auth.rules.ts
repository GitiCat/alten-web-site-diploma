import { buildCheckFunction } from 'express-validator'
import UserService from '../services/user.service'

const check = buildCheckFunction(['headers', 'cookies'])
const userService: UserService = new UserService()

export type AccessDeniedMsgTypes = {
    code: number,
    msg: string
}

export const AccessDeniedMsg: AccessDeniedMsgTypes = {
    code: 401,
    msg: 'Access denied'
}

export const authRules = {
    system: [
        check('Authorization')
            .custom(async (value: string) => {
                if (!value || value.length === 0) return Promise.reject(AccessDeniedMsg)

                const token: string = value.split(' ').length > 1
                    ? value.split(' ')[1]
                    : value

                const hasAccess: boolean = await userService.verifyJwtToken(token)
                return !hasAccess
                    ? Promise.reject(AccessDeniedMsg)
                    : true
            })
    ]
}
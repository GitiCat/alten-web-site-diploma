import * as bcrypt from 'bcrypt'
import { check } from 'express-validator'
import db from '../sequelize/index'

export const userRules = {
    login: [
        check('login').custom(async value => {
            const user = await db.Users.findOne({ where: { login: value } })
            if (!user)
                return Promise.reject('Invalid login or password')
        }),
        check('password').custom(async (value, { req }) => {
            const user = await db.Users.findOne({ where: { login: req.body.login } })
            if (!(await bcrypt.compare(value, user!.password)))
                return Promise.reject('Invalid login or password')
        })
    ]
}
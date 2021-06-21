import * as bcrypt from 'bcrypt'
import { check, buildCheckFunction } from 'express-validator'
import db from '../sequelize/index'

export const userRules = {
    login: [
        check('login')
            .custom(async value => {
                const user = await db.Users.findOne({ where: { login: value } })
                return !user ? Promise.reject('This user was not found') : true
            }),
        check('password')
            .custom(async (value, { req }) => {
                const user = await db.Users.findOne({ where: { login: req.body.login } })
                const isValid = await bcrypt.compare(value, user.password)
                return !isValid ? Promise.reject('Invalid user password') : true
            })
    ],
    register: [
        check('login')
            .custom(async (value: string) => {
                if(value.trim() === '') return Promise.reject('Login field can not empty')
                
                const user = await db.Users.findOne({ where: { login: value }})
                return user ? Promise.reject(`User with login ${user.login} already exists`) : true
            }),
        check('password')
            .custom(async (value: string) => {
                if(value.trim() === '') return Promise.reject('Password field can not empty')
                if(value.length < 6) return Promise.reject('Password must be at least 6 chars long')

                return true
            })
    ]
}
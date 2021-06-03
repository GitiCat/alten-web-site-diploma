import * as bcrypt from 'bcrypt'
import { check } from 'express-validator'
import db from '../sequelize/index'

export const userRules = {
    login: [
        check('login')
            .custom(async value => {
                const user = await db.Users.findAll({where: {login: value}})
                if(!user) return Promise.reject()
            })
            .withMessage('Gived username does not exist'),
        check('password')
            .custom(async (value, { req }) => {
                const user = await db.Users.findOne({where: {login: req.body.login}})
                const isValid = await bcrypt.compare(value, user!.password)

                if(!isValid) return Promise.reject()
            })
            .withMessage('Invalid password check')
    ]
}
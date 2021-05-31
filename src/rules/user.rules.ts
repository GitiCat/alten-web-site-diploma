import * as bcrypt from 'bcrypt'
import { check } from 'express-validator'
import db from '../sequelize/index'

export const userRules = {
    login: [
        check('login')
            .custom(login => { db.Users.findOne({ where: { login }}).then(user => !!user) })
            .withMessage('Invalid login or password'),
        check('password')
            .custom((password, { req }) => {
                return db.Users.findOne({where: { login: req.body.login }})
                    .then(user => bcrypt.compare(password, user!.password))
            })
            .withMessage('Invalid login or password')
    ]
}
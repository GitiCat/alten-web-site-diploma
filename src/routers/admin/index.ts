import { Router, Request, Response } from 'express'
import { authRules } from '../../rules/auth.rules'
import { checkAuthValidator } from '../check-auth-validator'
import services from '../../services/index.service'

export const adminRouter: Router = Router()
const params = (req: Request) => {
    return {
        title: 'Администрирование',
        current_user: req.cookies['auth_user'],
        layout: 'adminLayout'
    }
}

adminRouter.get('/articles', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    res.render('admin/articles', Object.assign({
        
    }, params(req)))
})

adminRouter.get('/categories-article', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    res.render('admin/categories-article', Object.assign({

    }, params(req)))
})

adminRouter.get('/products', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    res.render('admin/products', Object.assign({

    }, params(req)))
})

adminRouter.get('/categories-product', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    res.render('admin/categories-product', Object.assign({

    }, params(req)))
})

adminRouter.get('/users', authRules.system, async (req: Request, res: Response) => {
    const allUsers = await services.Users.getAll()
    res.render('admin/users', Object.assign({
        users: allUsers
    }, params(req)))
})
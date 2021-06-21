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

//#region Admin categories products routes
adminRouter.get('/categories-product', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    res.render('admin/categories-product', Object.assign({

    }, params(req)))
})

adminRouter.get('/categories-product/add', (req: Request, res: Response) => {
    res.render('admin/forms/categories-product', Object.assign({
        formTitle: 'Добавление категории продукции',
        url: "/users",
        method: 'POST',
        data: {
            name: '',
            title: ''
        },
        submitTitle: 'Добавить'
    }, params(req)))
})

adminRouter.get('/categories-product/change', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    const { name, title } = req.body
    res.render('admin/forms/categories-product', Object.assign({
        formTitle: 'Изменение категории продукции',
        method: 'PUT',
        data: {
            name: name,
            title: title
        },
        submitTitle: 'Изменить'
    }, params(req)))
})
//#endregion

adminRouter.get('/users', authRules.system, checkAuthValidator, async (req: Request, res: Response) => {
    const allUsers = await services.Users.getAll()
    res.render('admin/users', Object.assign({
        users: allUsers
    }, params(req)))
})

adminRouter.get('/users/add', authRules.system, (req: Request, res: Response) => {
    res.render('admin/forms/users', Object.assign({
        formTitle: 'Добавление нового пользователя',
        url: '/register',
        method: 'POST',
        data: {
            login: '',
            password: '',
            username: ''
        },
        submitTitle: 'Добавить'
    }, params(req)))
})
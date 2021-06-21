import { Router, Request, Response, NextFunction } from 'express'
import { apiRouter } from './api/index'
import { userRouter } from './user/index'
import { adminRouter } from './admin/index'
import RequestLogger from '../middlewares/request-logger'
import { authRules } from '../rules/auth.rules'
import { checkAuthValidator } from './check-auth-validator'
import homeContent from '../data/home'

export const appRouter: Router = Router()
//  Api router with database data
appRouter.use(RequestLogger)
appRouter.use(apiRouter)
appRouter.use(userRouter)

//#region Main routes
//  Main routes for home page
appRouter.get('/', (req: Request, res: Response) => {
    console.log(homeContent);
    
    res.render('home', {
        title: 'Главная',
        data: homeContent
    })
})

//  Main routes for products page
appRouter.get('/products', (req: Request, res: Response) => {
    res.render('products', {
        title: 'Продукция'
    })
})

//  Main routes for about page
appRouter.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'О нас'
    })
})

//  Main routes for contacts page
appRouter.get('/contacts', (req: Request, res: Response) => {
    res.render('contacts', {
        title: 'Контакты'
    })
})
//#endregion

appRouter.get('/admin', authRules.system, checkAuthValidator, (req: Request, res: Response) => {
    res.render('admin/index', {
        title: 'Администирование',
        current_user: req.cookies['auth_user'],
        layout: 'adminLayout'
    })
})

appRouter.use('/admin', authRules.system, adminRouter)
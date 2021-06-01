import { Router, Request, Response } from 'express'
import { apiRouter } from './api/index'
import { userRouter } from './user/index'
import { adminRouter } from './admin/index'
import TokenGuard from '../middlewares/token-guard'

export const appRouter: Router = Router()
//  Api router with database data
appRouter.use(apiRouter)
appRouter.use(userRouter)

//#region Main routes
//  Main routes for home page
appRouter.get('/', (req: Request, res: Response) => {
    res.render('home', {
        title: 'Главная'
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

appRouter.use(TokenGuard())
appRouter.get('/admin', (req: Request, res: Response) => {
    res.render('admin/index', {
        title: 'Администирование',
        current_user: req.cookies['auth_user'],
        layout: 'adminLayout'
    })
})

appRouter.use('/admin', adminRouter)
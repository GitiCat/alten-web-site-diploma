import { Router, Request, Response } from 'express'

export const adminRouter: Router = Router()
const params = (req: Request) => {
    return {
        title: 'Администрирование',
        current_user: req.cookies['auth_user'],
        layout: 'adminLayout'
    }
}

adminRouter.get('/articles', (req: Request, res: Response) => {
    res.render('admin/articles', Object.assign({
        
    }, params(req)))
})

adminRouter.get('/categories-article', (req: Request, res: Response) => {
    res.render('admin/categories-article', Object.assign({

    }, params(req)))
})

adminRouter.get('/products', (req: Request, res: Response) => {
    res.render('admin/products', Object.assign({

    }, params(req)))
})

adminRouter.get('/categories-product', (req: Request, res: Response) => {
    res.render('admin/categories-product', Object.assign({

    }, params(req)))
})

adminRouter.get('/users', (req: Request, res: Response) => {
    res.render('admin/users', Object.assign({

    }, params(req)))
})
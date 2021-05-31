import {
    Router,
    Request,
    Response
} from 'express'

export const categoryArticleRouter = Router()

categoryArticleRouter.get('/categories-article', (req: Request, res: Response) => {
    res.send('hi')
})
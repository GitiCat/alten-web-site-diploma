import {
    Router
} from 'express'
import CategoriesArticleRouter from './categories-article.router'

export const apiRouter = Router()
apiRouter.use('/api', CategoriesArticleRouter)
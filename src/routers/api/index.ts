import {
    Router
} from 'express'
import { categoryArticleRouter } from './category-article/index'

export const apiRouter = Router()
apiRouter.use('/api', categoryArticleRouter)
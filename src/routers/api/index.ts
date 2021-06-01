import {
    Router
} from 'express'
import { categoryArticleRouter } from './category-article/index'
import { articlesApiRouter } from './articles/index'

export const apiRouter = Router()
apiRouter.use('/api', categoryArticleRouter)
apiRouter.use('/api', articlesApiRouter)
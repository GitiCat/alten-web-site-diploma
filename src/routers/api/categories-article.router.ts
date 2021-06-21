import CategoryArticleController from '../../controllers/categoriesArticleController'
import { Router } from 'express'

const controller = new CategoryArticleController()
const categoriesArticleRouter = Router()

categoriesArticleRouter.get('/categories-article', controller.getAll)
categoriesArticleRouter.get('/categories-article/:id', controller.getById)
categoriesArticleRouter.post('/categories-article', controller.create)
categoriesArticleRouter.put('/categories-article/:id', controller.change)
categoriesArticleRouter.delete('/categoies-article/:id', controller.delete)

export default categoriesArticleRouter
import { Request, Response, NextFunction } from 'express'
import BaseController from './baseController'
import { ModelCtor } from 'sequelize/types'
import { ICategoryArticleInstance } from '../sequelize/models/categories-article-model'
import db from '../sequelize/index'
import { classProperty } from '../decorators/class-property'

class CategoryArticleController extends BaseController {
    @classProperty
    private _model: ModelCtor<ICategoryArticleInstance>

    constructor() { 
        super()
        this._model = db.CategoryArticle

        this.getAll = this.getAll.bind(this)
        this.getById = this.getById.bind(this)
        this.create = this.create.bind(this)
        this.change = this.change.bind(this)
        this.delete = this.delete.bind(this)
    }

    async getAll(req: Request, res: Response) {
        const data = await this._model.findAll()
        res.status(200).json(data)
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query
        if (!id) return next(res.status(400).json({ message: 'You must specify user ID' }))

        const data = await this._model.findOne({ where: { id: id}})
        if(!data) return next(res.status(404).json({ message: `Category articles with ${id} is not present in database` }))

        res.status(200).json(data)
    }

    create(req: Request, res: Response, next: NextFunction) {
        
    }

    change(req: Request, res: Response, next: NextFunction) {

    }

    delete(req: Request, res: Response, next: NextFunction) {

    }
}

export default CategoryArticleController
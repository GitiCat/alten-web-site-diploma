import { ModelCtor } from 'sequelize/types'
import dbSequelize from '../sequelize/index'
import {
    ICategoryArticleCreationAttributes,
    ICategoryArticleInstance
} from '../sequelize/models/categories-article-model'

export class CategoryArticleService {
    private _model: ModelCtor<ICategoryArticleInstance>

    constructor() {
        this._model = dbSequelize.CategoryArticle

        this.create = this.create.bind(this)
        this.getAll = this.getAll.bind(this)
        this.getById = this.getById.bind(this)
    }

    create({ name, title }: ICategoryArticleCreationAttributes) {
        return this._model.create({
            name: name,
            title: title
        })
    }

    getAll() {
        return this._model.findAll({ raw: true })
    }

    getById(id: number) {
        return this._model.findOne({ where: { id: id } })
    }
}
import { ModelCtor } from 'sequelize/types'
import { IUserAttributes, IUserInstance } from '../sequelize/models/user-model'
import db from '../sequelize/index'

export class UsersService {
    private _model: ModelCtor<IUserInstance>

    constructor() {
        this._model = db.Users

        this.getAll = this.getAll.bind(this)
        this.getById = this.getById.bind(this)
    }

    async getAll() {
        return await this._model.findAll({ raw: true })
    }

    async getById(id: number) {
        await this._model.findOne({ where: { id: id } })
    }
}
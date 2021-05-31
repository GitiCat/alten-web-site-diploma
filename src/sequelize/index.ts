import { Dialect, Sequelize } from 'sequelize'
import { DbConfig } from '../config/db_config'
import { initCategoryArticleModel, ICategoryArticleAttributes } from './models/categories-article-model'

const host: string      = DbConfig.dbConnection.host,
      port: number      = DbConfig.dbConnection.port,
      dialect: Dialect  = DbConfig.dbConnection.dialect,
      user: string      = DbConfig.dbUser.username,
      password: string  = DbConfig.dbUser.password,
      dbName: string    = DbConfig.dbName

const sequelize: Sequelize = new Sequelize(dbName, user, password, {
    host: host,
    port: port,
    dialect: dialect
})

const db = {
    sequelize,
    Sequelize,
    CategoryArticle: initCategoryArticleModel(sequelize)
}

Object.values(db).forEach((model: any) => {
    if(model.associate)
        model.associate(db)
})

export default db
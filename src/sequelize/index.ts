import { Dialect, Sequelize } from 'sequelize'
import { DbConfig } from '../config/db_config'
import { initialUserModel } from './models/user-model'
import { initCategoryArticleModel } from './models/categories-article-model'
import { initialArticleModel } from './models/article-model'
import { initialProductModel } from './models/product-model'
import { initialCategoryProductModel } from './models/categories-product-model'

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
    Users: initialUserModel(sequelize),
    Aritcles: initialArticleModel(sequelize),
    CategoryArticle: initCategoryArticleModel(sequelize).source,
    Products: initialProductModel(sequelize),
    CategoryProduct: initialCategoryProductModel(sequelize).source
}

Object.values(db).forEach((model: any) => {
    if(model.associate)
        model.associate(db)
})

export default db
import { DbConfigTypes } from '../types/db-config'

export const DbConfig: DbConfigTypes = {
    dbName: 'db_alten_diploma',
    dbUser: {
        username: 'root',
        password: '1528340aa'
    },
    dbConnection: {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
}
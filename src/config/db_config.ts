import { DbConfigTypes } from '../types/db-config'

export const DbConfig: DbConfigTypes = {
    dbName: '',
    dbUser: {
        username: '',
        password: ''
    },
    dbConnection: {
        host: '',
        port: 0,
        dialect: ''
    }
}
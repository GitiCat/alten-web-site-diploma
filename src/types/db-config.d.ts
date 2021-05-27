import { Dialect } from "sequelize/types";

export type DbConfigTypes = {
    dbName: string,
    dbUser: {
        username: string,
        password: string
    },
    dbConnection: {
        host: string,
        port: number
        dialect: Dialect,
    }
}
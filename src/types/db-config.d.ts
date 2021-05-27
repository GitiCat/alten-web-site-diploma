export type DbConfigTypes = {
    dbName: string,
    dbUser: {
        username: string,
        password: string
    },
    dbConnection: {
        host: string,
        port: number
        dialect: string,
    }
}
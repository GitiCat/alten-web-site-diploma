import { Dialect, Sequelize } from 'sequelize'
import { DbConfig } from '../config/db_config'

class SequelizeInit {
    private _dbName: string = DbConfig.dbName
    private _host: string = DbConfig.dbConnection.host
    private _port: number = DbConfig.dbConnection.port
    private _dialect: Dialect = DbConfig.dbConnection.dialect
    private _user: string = DbConfig.dbUser.username
    private _password: string = DbConfig.dbUser.password
    
    private _seqExample: Sequelize
    
    constructor() {
        this.init()
    }

    private async init() {
        this._seqExample = new Sequelize(this._dbName, this._user, this._password, {
            host: this._host,
            port: this._port,
            dialect: this._dialect
        })

        try {
            await this._seqExample.authenticate()
            console.log('Connection has been established successfully.');
        } catch(error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    get sequelize() {
        return this._seqExample
    }

    async closeConnection() {
        try {
            await this.sequelize.close()
            console.log('Connection has been closed successfully.')
        } catch(error) {
            console.error('An error occurred while closing the connection:', error)
        }
    }
}

export default SequelizeInit
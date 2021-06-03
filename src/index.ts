import path from 'path'
import express, { Application, Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import chalk from 'chalk'
import { appRouter } from './routers/index'
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware'
import RegisterHbs from './register-hbs'
import dbSequelize from './sequelize/index'
import UserService from './services/user.service'

const serverHost: string = 'localhost',
      serverPort: number = 3000

const app: Application = express()
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

const registerHbs = new RegisterHbs({app: app})
registerHbs.register()

app.use(appRouter)
app.use(ErrorHandlerMiddleware)

dbSequelize.sequelize.authenticate().then(() => {
    console.log(chalk.green('[DATABASE]: Authenticate with database has been successful.'))

    dbSequelize.sequelize.sync({logging: true, force: true}).then(() => {
        console.log(chalk.green('[DATABASE]: Sync tables in database has been seccessful.'))
        createRootUser().then(() => {
            app.listen(serverPort, serverHost, () => {
                console.log(chalk.green(`[SERVER]: Server started at: ${serverHost}:${serverPort}`));
            })
        })
    })
})

const createRootUser = async () => {
    const userService: UserService = new UserService()
    return await userService.getOrCreateUser('root', 'root', 'superuser')
}
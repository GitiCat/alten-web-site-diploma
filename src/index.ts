import path from 'path'
import express, { Application, Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import chalk from 'chalk'
import { appRouter } from './routers/index'
import RegisterHbs from './register-hbs'
import dbSequelize from './sequelize/index'

const serverHost: string = 'localhost',
      serverPort: number = 8000

const app: Application = express()
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

const registerHbs = new RegisterHbs({app: app})
registerHbs.register()

app.use(appRouter)

dbSequelize.sequelize.authenticate().then(() => {
    console.log(chalk.cyan('Authenticate with database has been successful.'))

    dbSequelize.sequelize.sync({force: true}).then(() => {
        console.log(chalk.cyan('Sync tables in database has been seccessful.'))
        
        app.listen(serverPort, serverHost, () => {
            console.log(chalk.cyan(`Server started at: ${serverHost}:${serverPort}`));
        })
    })
})
import path from 'path'
import express, { Application, Request, Response } from 'express'
import chalk from 'chalk'
import RegisterHbs from './register-hbs'
import dbSequelize from './sequelize/index'

const serverHost: string = 'localhost',
      serverPort: number = 8000

const app: Application = express()
app.use('/static', express.static(path.join(__dirname, '/public')))

const registerHbs = new RegisterHbs({app: app})
registerHbs.register()

app.get('/', (req: Request, res: Response) => {
    res.render('home', {
        title: 'Главная'
    })
})

app.get('/products', (req: Request, res: Response) => {
    res.render('products', {
        title: 'Продукция'
    })
})

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'О нас'
    })
})

app.get('/contacts', (req: Request, res: Response) => {
    res.render('contacts', {
        title: 'Контакты'
    })
})

dbSequelize.sequelize.authenticate().then(() => {
    console.log(chalk.cyan('Authenticate with database has been successful.'))

    dbSequelize.sequelize.sync({force: true}).then(() => {
        console.log(chalk.cyan('Sync tables in database has been seccessful.'))
        
        app.listen(serverPort, serverHost, () => {
            console.log(chalk.cyan(`Server started at: ${serverHost}:${serverPort}`));
        })
    })
})
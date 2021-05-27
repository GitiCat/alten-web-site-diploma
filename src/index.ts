import path from 'path'
import express, { Application, Request, Response } from 'express'
import RegisterHbs from './register-hbs'

const serverHost: string = 'localhost',
      serverPort: number = 8000

const app: Application = express()
app.use('/static', express.static(path.join(__dirname, '/public')))

const registerHbs = new RegisterHbs({app: app})
//  Registration hbs template engine
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

app.listen(serverPort, serverHost, () => {
    console.log(`Server started at: ${serverHost}:${serverPort}`);
})
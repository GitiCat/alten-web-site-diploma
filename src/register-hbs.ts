import hbs from 'hbs'
import expressHandlebars from 'express-handlebars'
import { RegisterHbsTypes } from './types/register-hbs'
import { Application } from 'express'
import path from 'path'

class RegisterHbs {
    app: Application
    
    constructor(props: RegisterHbsTypes) {
        this.app = props.app
    }

    register() {
        this.app.engine('hbs', expressHandlebars({
            defaultLayout: 'layout',
            layoutsDir: path.join(__dirname, 'views', 'layouts'),
            extname: 'hbs'
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        hbs.registerPartials(path.join(__dirname, "/views/partials"))
    }
}

export default RegisterHbs
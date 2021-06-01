import { Router, Request, Response, NextFunction } from 'express'
import { matchedData } from 'express-validator'
import db from '../../../sequelize/index'

export const articlesApiRouter: Router = Router()
const model = db.Aritcles

articlesApiRouter.get('/articles', (req: Request, res: Response) => {
    const data = model.findAll({raw: true}).then(items => items)
    res.status(200).json(data)
})

articlesApiRouter.get('/article/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const item = await model.findOne({ where: { id: id } })

    res.status(200).json(item)
})

articlesApiRouter.post('/articles', (req: Request, res: Response) => {
    const body = matchedData(req) as {
        name: string,
        title: string,
        subtitle?: string,
        text: string
    }

    model.create({
        name: body.name,
        title: body.title,
        subtitle: body.subtitle,
        text: body.text,
    }).then(item => {
        res.status(200).location(`'/api/articles/'${item.id}`).json(item)
    }).catch(error => {
        res.status(400).json({
            status_code: 400,
            msg: error
        })
    })
})

articlesApiRouter.delete('/articles/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: number | null = Number(req.params.id)    
    if(!id) {
        res.status(400).json({
            statusCode: 400,
            msg: 'Please specify a article id'
        })
        next()
    }

    const article = await model.findOne({ where: { id: id }})
    if(!article) {
        res.status(404).json({
            statusCode: 404,
            msg: `Article with id ${id} not found`
        })
        next()
    }

    article.destroy().then(() => res.status(200).json({}))
})
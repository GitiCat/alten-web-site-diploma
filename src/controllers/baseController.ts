import { Request, Response, NextFunction } from 'express'
import IController from '../interfaces/IController'
import db from '../sequelize/index'

class BaseController implements IController {
    getAll(req: Request, res: Response) {
        throw Error('Method not overridden')
    }

    getById(req: Request, res: Response, next: NextFunction) {
        throw Error('Method not overridden')
    }

    create(req: Request, res: Response, next: NextFunction) {
        throw Error('Method not overridden')
    }

    change(req: Request, res: Response, next: NextFunction) {
        throw Error('Method not overridden')
    }

    delete(req: Request, res: Response, next: NextFunction) {
        throw Error('Method not overridden')
    }
}

export default BaseController
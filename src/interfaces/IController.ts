import { Request, Response, NextFunction } from 'express'

export default interface IController {
    getAll(req: Request, res: Response): void
    getById(req: Request, res: Response, next: NextFunction): void
    create(req: Request, res: Response, next: NextFunction): void
    change(req: Request, res: Response, next: NextFunction): void
    delete(req: Request, res: Response, next: NextFunction): void
}
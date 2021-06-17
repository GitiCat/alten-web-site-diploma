import { Request, Response, NextFunction } from 'express'

const RequestLogger = (req: Request, res: Response, next: NextFunction) => {
    let now = new Date()
    let hour: number = now.getHours(),
        minutes: number = now.getMinutes(),
        seconds: number = now.getSeconds()

    let data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")}`
    console.log(data)

    next()
}

export default RequestLogger
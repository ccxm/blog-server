import { Request, Response, NextFunction } from 'express'
export interface IReqFunction {
    (req: Request, res: Response, next: NextFunction): any
}

export interface IFsFunction {
    (srcId: string, userId: string, next: NextFunction): any
}

export interface IFsFileFunction {
    (data: any, srcId: string, userId: string, next: NextFunction): any
}
import { IReqFunction } from './../interfaces/functions'
import {Request, Response, NextFunction} from 'express'
export interface IMUser {
    login: (req:Request, res:Response, next: NextFunction) => void
}
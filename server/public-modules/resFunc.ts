import { statusCode } from '../config/statusCode'
import { IResponse } from './public-interfaces'
import { Response } from 'express'

// 成功的响应
export const success = (data: object, res: Response, msg?: string): void => {
    const temp: IResponse = {
        code: statusCode.SUCCESS.code,
        msg: msg || statusCode.SUCCESS.msg,
        data
    }
    console.log(temp)
    res.json(temp)
}

// 回复指定内容
export const appoint = (target: any, res: Response, data: object = {}): void => {
    const temp: IResponse = {
        code: target.code,
        msg: target.msg,
        data
    }
    res.json(temp)
}
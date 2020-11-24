import * as mongoose from 'mongoose'
// 操作数据库的选项
export interface sql {
    query: object
    condition?: object
    options?: mongoose.QueryFindOneAndUpdateOptions
    errCode?: object
    isResponse?: boolean
    isNotResponseError?: boolean
    successMsg?: string
    showDate?: boolean
    updateArrLength?: number
    updateOptions?: mongoose.ModelUpdateOptions
}

// 操作数据库的返回值
export interface resDoc {
    doc?: any
    isError?: boolean
}

// 响应的参数
export interface IResponse {
    code: number
    msg: string
    data: object
}

// 请求的token
export interface IReqToken {
    userId: string
    iat: number
    exp: number
}

// 参数校验的返回值
export interface IParamsCheckRes {
    emptyResultStr: string  // 空参数
    illegalResultStr: string  // 不合法的参数
    result: string  // 检验的结果
}

export type IModel = mongoose.Model<mongoose.Document>

type a = string | number

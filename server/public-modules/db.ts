import * as mongoose from 'mongoose'
import { Response, NextFunction } from 'express'
import { sql, resDoc } from './public-interfaces'
import { success, appoint } from './../public-modules/resFunc'
export class DB {
    public model: mongoose.Model<mongoose.Document>
    public success = success
    public appoint = appoint
    private hideDate = { createdAt: false, updatedAt: false }
    constructor(modelName: string, schema: mongoose.Schema) {
        this.model = mongoose.model(modelName, schema)
    }

    private handleResolve() {

    }


    handleReject(err: any, resolve: any, next: NextFunction) {
        let resDoc: resDoc = {}
        next(err)
        resDoc.isError = true
        resolve(resDoc)
    }

    findOne(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.findOne(sql.query, sql.condition).then((doc: any) => {
                let result: resDoc = {}
                if (doc) {
                    result.doc = doc
                } else {
                    result.isError = true
                    appoint(sql.errCode, res)
                }
                resolve(result)
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    success(doc, res, sql.successMsg)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    // 检查某个字段的值是否已经存在
    findFieldIsExist(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.findOne(sql.query, sql.condition).then(doc => {
                let result: resDoc = { doc }
                resolve(result)
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    create(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.create({ ...sql.query }).then(doc => {
                resolve(true)
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    insertMany(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.insertMany(sql.query).then(doc => {
                resolve(true)
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    deleteOne(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.deleteOne(sql.query).then(doc => {
                let result: resDoc = {}
                if (doc.n) {
                    result.isError = false
                } else {
                    result.isError = true
                    appoint(sql.errCode, res)
                }
                resolve(result)
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    success({}, res, sql.successMsg)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    deleteMany(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.deleteMany(sql.query).then(doc => {
                let result: resDoc = {}
                if (doc.n === sql.updateArrLength) {
                    result.isError = false
                } else {
                    result.isError = true
                    appoint(sql.errCode, res)
                }
                resolve(result)
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    success({}, res, sql.successMsg)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    updateOne(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.updateOne({ ...sql.query }, { ...sql.condition }, {
                ...(sql.updateOptions ? sql.updateOptions : {})
            }).then(doc => {
                let result: resDoc = {}
                if (doc.n) {
                    result.isError = false
                } else {
                    result.isError = sql.isNotResponseError ? false : true
                    if (!sql.isNotResponseError) {
                        appoint(sql.errCode, res)
                    }
                }
                resolve(result)
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    success({}, res, sql.successMsg)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    updateMany(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.updateMany({ ...sql.query }, { ...sql.condition }).then(doc => {
                let result: resDoc = {}
                if (doc.n === sql.updateArrLength) {
                    result.isError = false
                } else {
                    result.isError = true
                    appoint(sql.errCode, res)
                }
                resolve(result)
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    success({}, res, sql.successMsg)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    findOneAndUpdate(res: Response, next: NextFunction, sql: sql) {
        return new Promise(resolve => {
            this.model.findOneAndUpdate({ ...sql.query }, { ...sql.condition }, {
                ...(sql.options ? sql.options : {})
            }).then(doc => {
                let result: resDoc = {}
                if (doc) {
                    result.doc = doc
                } else {
                    result.isError = true
                    appoint(sql.errCode, res)
                }
                resolve(result)
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    success(doc, res, sql.successMsg)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    deepCopy(obj: object): object {
        return JSON.parse(JSON.stringify(obj))
    }
}
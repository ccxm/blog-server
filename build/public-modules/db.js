"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongoose = require("mongoose");
const resFunc_1 = require("./../public-modules/resFunc");
class DB {
    constructor(modelName, schema) {
        this.success = resFunc_1.success;
        this.appoint = resFunc_1.appoint;
        this.hideDate = { createdAt: false, updatedAt: false };
        this.model = mongoose.model(modelName, schema);
    }
    handleResolve() {
    }
    handleReject(err, resolve, next) {
        let resDoc = {};
        next(err);
        resDoc.isError = true;
        resolve(resDoc);
    }
    findOne(res, next, sql) {
        return new Promise(resolve => {
            this.model.findOne(sql.query, sql.condition).then((doc) => {
                let result = {};
                if (doc) {
                    result.doc = doc;
                }
                else {
                    result.isError = true;
                    resFunc_1.appoint(sql.errCode, res);
                }
                resolve(result);
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    resFunc_1.success(doc, res, sql.successMsg);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    // 检查某个字段的值是否已经存在
    findFieldIsExist(res, next, sql) {
        return new Promise(resolve => {
            this.model.findOne(sql.query, sql.condition).then(doc => {
                let result = { doc };
                resolve(result);
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    create(res, next, sql) {
        return new Promise(resolve => {
            this.model.create(Object.assign({}, sql.query)).then(doc => {
                resolve(true);
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    insertMany(res, next, sql) {
        return new Promise(resolve => {
            this.model.insertMany(sql.query).then(doc => {
                resolve(true);
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    deleteOne(res, next, sql) {
        return new Promise(resolve => {
            this.model.deleteOne(sql.query).then(doc => {
                let result = {};
                if (doc.n) {
                    result.isError = false;
                }
                else {
                    result.isError = true;
                    resFunc_1.appoint(sql.errCode, res);
                }
                resolve(result);
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    resFunc_1.success({}, res, sql.successMsg);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    deleteMany(res, next, sql) {
        return new Promise(resolve => {
            this.model.deleteMany(sql.query).then(doc => {
                let result = {};
                if (doc.n === sql.updateArrLength) {
                    result.isError = false;
                }
                else {
                    result.isError = true;
                    resFunc_1.appoint(sql.errCode, res);
                }
                resolve(result);
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    resFunc_1.success({}, res, sql.successMsg);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    updateOne(res, next, sql) {
        return new Promise(resolve => {
            this.model.updateOne(Object.assign({}, sql.query), Object.assign({}, sql.condition), Object.assign({}, (sql.updateOptions ? sql.updateOptions : {}))).then(doc => {
                let result = {};
                if (doc.n) {
                    result.isError = false;
                }
                else {
                    result.isError = sql.isNotResponseError ? false : true;
                    if (!sql.isNotResponseError) {
                        resFunc_1.appoint(sql.errCode, res);
                    }
                }
                resolve(result);
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    resFunc_1.success({}, res, sql.successMsg);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    updateMany(res, next, sql) {
        return new Promise(resolve => {
            this.model.updateMany(Object.assign({}, sql.query), Object.assign({}, sql.condition)).then(doc => {
                let result = {};
                if (doc.n === sql.updateArrLength) {
                    result.isError = false;
                }
                else {
                    result.isError = true;
                    resFunc_1.appoint(sql.errCode, res);
                }
                resolve(result);
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    resFunc_1.success({}, res, sql.successMsg);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    findOneAndUpdate(res, next, sql) {
        return new Promise(resolve => {
            this.model.findOneAndUpdate(Object.assign({}, sql.query), Object.assign({}, sql.condition), Object.assign({}, (sql.options ? sql.options : {}))).then(doc => {
                let result = {};
                if (doc) {
                    result.doc = doc;
                }
                else {
                    result.isError = true;
                    resFunc_1.appoint(sql.errCode, res);
                }
                resolve(result);
                // 如果需要响应，则直接返回
                if (sql.isResponse) {
                    resFunc_1.success(doc, res, sql.successMsg);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map
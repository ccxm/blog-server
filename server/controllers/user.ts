import { DB } from './../public-modules/db'
import { NextFunction } from 'express'
import { userModl } from './../models/user'
import { IReqFunction } from './../interfaces/functions'
import { statusCode } from './../config/statusCode'
import { resDoc } from './../public-modules/public-interfaces'
import { CONFIG } from './../config/config'
import { createUuid, createFolderId } from './../utils/utils'
import { IUser, IStatistics } from './../interfaces/user'
import { defaultImageList } from './../config/constant'
import { folderInstance } from './folder'
import { gatherInstance } from './gather'
import * as jwt from 'jsonwebtoken'
import * as md5 from 'md5'
import * as fs from 'fs'
import { fileInstance } from './file'

export class User extends DB {
    static instance: User
    constructor() {
        super('users', userModl)
    }

    static getInstance(): User {
        if (!User.instance) {
            User.instance = new User()
        }
        return User.instance
    }

    login: IReqFunction = (req, res, next) => {
        this.findOne(res, next, {
            query: { email: req.body.email, password: md5(req.body.password) },
            condition: {
                userId: true, email: true, userInfo: true, _id: false
            },
            errCode: statusCode.LOGIN_FAIL
        }).then((data: resDoc) => {
            console.log(data)
            if (data.doc) {
                this.success({
                    ...JSON.parse(JSON.stringify(data.doc)),
                    token: 'Bearer ' + this.createToken(data.doc.userId)
                }, res, '登录成功')
            }
        })
    }

    register: IReqFunction = async (req, res, next) => {
        const isEmailExist: boolean = await this.findTheFieldIsExit('email', req.body.email, next) as boolean
        if (isEmailExist) {
            this.appoint(statusCode.EMAIL_BEEN_USED, res)
            return
        }
        const userId: string = createUuid()
        const temp: IUser = {
            userId,
            email: req.body.email,
            nickName: req.body.email,
            password: md5(req.body.password),
            userInfo: {
                nickName: req.body.email,
                avatarUrl: CONFIG.DEFAULT_IMAGES_PATH + defaultImageList[Math.floor(Math.random() * 10)] + '.png',
                tempUrl: ''
            }
        }
        this.create(res, next, {
            query: { ...temp }
        }).then(async () => {
            req.body.folderName = 'NewFolder'
            req.body.userId = userId
            if (!await folderInstance.newFolder(req, res, next, false, false)) {
                return
            }
            const initGatherRes: resDoc = await gatherInstance.createGather(userId, res, next)
            if (initGatherRes.isError) {
                return
            }
            this.success({ userId }, res, '注册成功')
        })
    }

    uploadMd: IReqFunction = (req, res, next) => {
        console.log(req.body)
        fs.writeFileSync('./test.md', req.body.md)
    }

    getMd: IReqFunction = (req, res, next) => {
        res.end(fs.readFileSync('./test.md'))
    }

    updatePageView: IReqFunction = (req, res, next) => {
        this.findOneAndUpdate(res, next, {
            query: {
                userId: req.body.userId
            },
            condition: {
                $inc: { pageView: 1 }
            },
            options: {
                new: true,
                fields: {
                    _id: false,
                    pageView: true
                }
            },
            errCode: statusCode.update_visitor_page_view_err
        }).then((doc: resDoc) => {
            if (!doc.isError) {
                this.success(doc.doc, res, '更新访客浏览量成功')
            }
        })
    }

    getPageView: IReqFunction = (req, res, next) => {
        this.findOne(res, next, {
            query: {
                userId: req.body.userId
            },
            condition: {
                _id: false,
                pageView: true
            },
            errCode: statusCode.get_visitor_page_view_err
        }).then((doc: resDoc) => {
            if (!doc.isError) {
                this.success(doc.doc, res, '获取访客浏览量成功')
            }
        })
    }

    // 查找某个字段是否存在
    findTheFieldIsExit(field: string, value: any, next: NextFunction) {
        return new Promise(resolve => {
            this.model.findOne({ [field]: value }, { [field]: true, _id: false }).then((res: any) => {
                // 不存在或者是字段相等都可以使用
                if (!res || res[field] === value) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            }).catch(err => {
                this.handleReject(err, resolve, next)
            })
        })
    }

    // 获取统计数据
    getStatistics: IReqFunction = async (req, res, next) => {
        const userId: string = req.body.userId
        const articleRes: resDoc = await fileInstance.countFiles(userId, res, next)
        const sortRes: resDoc = await folderInstance.countFolders(userId, res, next)
        const tagRes: resDoc = await gatherInstance.countTags(userId, res, next)
        if (articleRes.isError || sortRes.isError || tagRes.isError) {
            return
        }
        const temp: IStatistics = {
            articleNum: articleRes.doc.count,
            sortNum: sortRes.doc.count,
            tagNum: tagRes.doc.count
        }
        this.success(temp, res, '获取统计数据成功')
    }

    private createToken(userId: string): string {
        return jwt.sign({
            userId
        }, CONFIG.JWT_SERCRET, {
            expiresIn: CONFIG.JWT_EXPIRES_TIME
        })
    }
}

export const userInstance: User = User.getInstance()

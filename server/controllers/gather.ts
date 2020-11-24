import { DB } from '../public-modules/db'
import { NextFunction, Response, Request } from 'express'
import { gatherModel } from '../models/gather'
import { IReqFunction } from '../interfaces/functions'
import { statusCode } from '../config/statusCode'
import { resDoc } from '../public-modules/public-interfaces'
import { createTagId } from '../utils/utils'
import { IFileBase } from './../interfaces/file'
import { defaultTag } from './../config/constant'
import { ITag, IUpdateTag, IUpdateFileList, IUpdateFolderList } from './../interfaces/gather'

export class Gather extends DB {
    static instance: Gather
    constructor() {
        super('gathers', gatherModel)
    }

    static getInstance() {
        if (!Gather.instance) {
            Gather.instance = new Gather()
        }
        return Gather.instance
    }

    // 加入文件，即文章
    updateArticleList = async (params: IUpdateFileList, res: Response, next: NextFunction) => {
        const temp: IFileBase = {
            fileId: params.fileId,
            folderId: params.folderId
        }
        const condition = params.isDel ? { $pull: { fileList: temp } } : { $addToSet: { fileList: temp } }
        const result: resDoc = await this.updateOne(res, next, {
            query: { userId: params.userId },
            condition,
            isNotResponseError: true
        })
        return result.isError
    }

    // 加入文件夹，即分类
    updateSortList = async (params: IUpdateFolderList, res: Response, next: NextFunction) => {
        const condition = params.isDel ? { $pull: { folderList: params.folderId } } : { $addToSet: { folderList: params.folderId } }
        const result: resDoc = await this.updateOne(res, next, {
            query: { userId: params.userId },
            condition,
            isNotResponseError: true
        })
        return result.isError
    }

    createGather = (userId: String, res: Response, next: NextFunction) => {
        return this.create(res, next, {
            query: { userId, tagList: this.createTag() }
        })
    }

    // 获取标签列表
    getTagList: IReqFunction = (req, res, next) => {
        this.findOne(res, next, {
            query: { userId: req.body.userId },
            condition: {
                _id: false,
                tagList: true
            },
            errCode: statusCode.find_tag_error
        }).then((doc: resDoc) => {
            if (!doc.isError) {
                this.success(doc.doc, res, '获取标签列表成功')
            }
        })
    }

    // 新增tag
    addTag = async (req: Request, res: Response, next: NextFunction) => {
        const findResult: resDoc = await this.findFieldIsExist(res, next, {
            query: { userId: req.body.userId, 'tagList.tagName': req.body.tagName },
            errCode: statusCode.tag_is_existed
        })
        if (findResult.isError) {
            return
        }
        if (findResult.doc) {
            this.appoint(statusCode.tag_is_existed, res)
            return
        }
        const newTag: ITag = {
            tagName: req.body.tagName,
            tagId: createTagId()
        }
        const result: resDoc = await this.updateOne(res, next, {
            query: { userId: req.body.userId },
            condition: { $push: { tagList: newTag } },
            errCode: statusCode.new_tag_error
        })
        if (result.isError) {
            return
        }
        this.success(newTag, res, '新增标签成功')
    }

    // 更新标签
    updateTag = async (params: IUpdateTag, res: Response, next: NextFunction) => {
        const condition = params.isDel ? { $pull: { 'tagList.$[a].list': params.fileId } } : { $addToSet: { 'tagList.$[a].fileList': params.fileId } }
        const result: resDoc = await this.updateOne(res, next, {
            query: { userId: params.userId },
            condition,
            updateOptions: {
                arrayFilters: [{
                    'a.tagId': {
                        $in: params.tagList
                    }
                }]
            },
            isNotResponseError: true
        })
        return result.isError
    }


    // 创建标签
    createTag(): ITag[] {
        const arr: ITag[] = []
        defaultTag.forEach(item => {
            arr.push({
                tagId: createTagId(),
                tagName: item
            })
        })
        return arr
    }

    // 计算标签的数量
    countTags(userId: string, res: Response, next: NextFunction) {
        const resDoc: resDoc = {}
        return new Promise(resolve => {
            this.model.aggregate([
                { "$match": { userId } },
                {
                    "$project": { "count": { "$size": "$tagList" } }
                }
            ]).then((doc: any) => {
                resDoc.doc = {
                    count: doc[0].count
                }
                resolve(resDoc)
            }).catch(err => {
                resDoc.isError = true
                next(err)
                resolve(resDoc)
            })
        })
    }

}

export const gatherInstance: Gather = Gather.getInstance()

// gatherInstance.createGather('u_768804817990', null, null).then(res => {
//     // console.log(res.isError)

// })

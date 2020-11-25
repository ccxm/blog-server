import { DB } from '../public-modules/db'
import { NextFunction, Response, Request } from 'express'
import { fileModel } from '../models/file'
import { IReqFunction } from '../interfaces/functions'
import { statusCode } from '../config/statusCode'
import { resDoc } from '../public-modules/public-interfaces'
import { createObjectId, createFileId } from '../utils/utils'
import { INewFile, IUpdateFile, IRenameFile, IDeleteFile, ICopyFile } from '../interfaces/file'
import { folderInstance } from './folder'
import { gatherInstance } from './gather'
import { IUpdateTag } from '../interfaces/gather'
import { ofs } from '../public-modules/fs'
import * as fs from 'fs'
import {CONFIG} from "../config/config"
import * as path from 'path'

export class File extends DB {
    static instance: File
    private pageViewMap = new Map()
    constructor() {
        super('files', fileModel)
    }

    static getInstance() {
        if (!File.instance) {
            File.instance = new File()
        }
        return File.instance
    }

    newFile: IReqFunction = async (req, res, next) => {
        const params: INewFile = {
            fileName: req.body.fileName,
            folderId: req.body.folderId,
            fileId: createFileId(),
            userId: req.body.userId,
        }
        const isFolderExist: resDoc = await folderInstance.addFileToFolder(params, res, next)
        if (isFolderExist.isError) {
            return
        }
        this.create(res, next, {
            query: params
        }).then(async (result: resDoc) => {
            if (!result.isError) {
                if (await ofs.writeFile('', `${params.folderId}//${params.fileId}.md`, params.userId, next)) {
                    delete params['userId']
                    this.success(params, res, '新建文件成功')
                }
            }
        })
    }

    insertFiles(fileList: Array<object>, res: Response, next: NextFunction) {
        return this.insertMany(res, next, {
            query: fileList
        })
    }

    updateFile: IReqFunction = async (req, res, next) => {
        const params: IUpdateFile = req.body
        const updateTagParams: IUpdateTag = {
            fileId: params.fileId,
            isDel: false,
            tagList: req.body.tagList,
            userId: params.userId
        }
        const updateTagError: boolean = await gatherInstance.updateTag(updateTagParams, res, next)
        const checkFileInFolder: resDoc = await folderInstance.checkFileIsInFolder(params, res, next)
        if (checkFileInFolder.isError || updateTagError) {
            return
        }
        if (await ofs.writeFile(params.fileContent, `${params.folderId}//${params.fileId}.md`, params.userId, next)) {
            this.success({}, res, '更新文件成功')
        }
    }

    renameFile: IReqFunction = async (req, res, next) => {
        const params: IRenameFile = req.body
        const updateNameResult: resDoc = await folderInstance.updateFileInFolder(res, next, {
            params,
            condition: {
                $set: {
                    'folderList.$[a].fileList.$[b].fileName': params.newFileName
                }
            },
            errCode: statusCode.update_name_in_folder_err
        })
        if (updateNameResult.isError) {
            return
        }
        this.updateOne(res, next, {
            query: { userId: params.userId, fileId: params.fileId },
            condition: {
                $set: { fileName: params.newFileName }
            },
            errCode: statusCode.update_name_in_file_err
        }).then((result: resDoc) => {
            if (!result.isError) {
                this.success({}, res, '重命名文件成功')
            }
        })
    }

    deleteFile: IReqFunction = async (req, res, next) => {
        const params: IDeleteFile = req.body
        const delResult: resDoc = await folderInstance.updateFileInFolder(res, next, {
            params,
            condition: {
                $set: {
                    'folderList.$[a].fileList.$[b].isDel': true
                }
            },
            errCode: statusCode.delete_file_in_folder_err
        })
        if (!delResult.isError) {
            this.success({}, res, '该文件已成功移入回收站，可通过回收站找回')
        }
    }

    deleteFileFromDB(fileIdList: Array<string>, userId: string, res: Response, next: NextFunction) {
        return this.deleteMany(res, next, {
            query: { userId, fileId: { $in: fileIdList } },
            errCode: statusCode.delete_file_from_db_err,
            updateArrLength: fileIdList.length
        })
    }

    // 生成新文件，为复制剪切做准备
    createNewFile: IReqFunction = async (req: Request, res: Response, next: NextFunction, isCut: boolean = false) => {
        const params: ICopyFile = req.body
        const findFileRes: resDoc = await this.findOne(res, next, {
            query: { userId: params.userId, fileId: params.fileId, folderId: params.sourceFolderId },
            condition: { _id: false, fileName: true },
            errCode: statusCode.find_file_err
        })
        if (findFileRes.isError) {
            return false
        }
        params.fileName = findFileRes.doc.fileName
        const newParams: INewFile = {
            fileName: isCut ? params.fileName : `${params.fileName}_copy`,
            folderId: params.targetFolderId,
            fileId: createFileId(),
            userId: params.userId,
        }
        const newFileRes: resDoc = await this.create(res, next, {
            query: newParams
        })
        if (newFileRes.isError) {
            return false
        }
        const isFolderExist: resDoc = await folderInstance.addFileToFolder(newParams, res, next)
        if (isFolderExist.isError) {
            return false
        }
        return newParams
    }

    copyFile: IReqFunction = async (req, res, next) => {
        const newParams: INewFile = await this.createNewFile(req, res, next)
        if (!newParams) {
            return
        }
        const params: ICopyFile = req.body
        const copyRes: boolean = await ofs.copyFile(`${params.sourceFolderId}//${params.fileId}.md`,
            `${params.targetFolderId}//${newParams.fileId}.md`, params.userId, next) as boolean
        if (copyRes) {
            delete newParams['userId']
            this.success({ newFile: newParams }, res, '复制文件成功')
            return true
        }
    }

    cutFile: IReqFunction = async (req, res, next) => {
        const newParams: INewFile = await this.createNewFile(req, res, next)
        if (!newParams) {
            return
        }
        const params: ICopyFile = req.body
        const cutRes: boolean = await ofs.renameFile(`${params.sourceFolderId}//${params.fileId}.md`,
            `${params.targetFolderId}//${newParams.fileId}.md`, params.userId, next) as boolean
        if (cutRes) {
            const deleteParams: IDeleteFile = {
                fileId: params.fileId,
                userId: params.userId
            }
            const deleteRes: resDoc = await folderInstance.deleteFileFromFolder(deleteParams, res, next)
            if (!deleteRes.isError) {
                this.deleteOne(res, next, {
                    query: { userId: params.userId, fileId: params.fileId },
                    errCode: statusCode.cut_file_null
                }).then((result: resDoc) => {
                    if (!result.isError) {
                        this.success({ cutFile: newParams }, res, '剪切文件成功')
                    }
                })
            }
        }
    }

    countFiles(userId: string, res: Response, next: NextFunction) {
        const resDoc: resDoc = {}
        return new Promise(resolve => {
            this.model.countDocuments({ userId }).then(count => {
                resDoc.doc = {
                    count
                }
                console.log(count)
                resolve(resDoc)
            }).catch(err => {
                resDoc.isError = true
                next(err)
                console.log(err)
                resolve(resDoc)
            })
        })
    }

    getLastFileList: IReqFunction = (req, res, next) => {
        this.model.find({ userId: req.body.userId }, {
            _id: false
        }).sort({ createdAt: -1 }).limit(5).then(doc => {
            this.success({ lastArticleList: doc }, res, '获取最新文章列表成功')
        }).catch(err => {
            next(err)
        })
    }

    getFileList: IReqFunction = (req, res, next) => {
        console.log(req.ip)
        this.model.find({ userId: req.body.userId }, {
            _id: false
        }).sort({ createdAt: -1 }).then(doc => {
            this.success({ articleList: doc }, res, '获取文章列表成功')
        }).catch(err => {
            next(err)
        })
    }

    updatePageView: IReqFunction = (req, res, next) => {
        this.findOneAndUpdate(res, next, {
            query: {
                fileId: req.body.fileId
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
            errCode: statusCode.update_page_view_err
        }).then((doc: resDoc) => {
            if (!doc.isError) {
                this.success(doc.doc, res, '更新浏览量成功')
            }
        })
    }

    // 更新文章图片链接
    updateFileImage: IReqFunction = (req, res, next) => {
        this.findOneAndUpdate(res, next, {
            query: {
                fileId: req.body.fileId,
                userId: req.body.userId
            },
            condition: {
                $set: {
                    fileImage: req.body.fileImage
                }
            },
            options: {
                new: false,
                fields: {
                    _id: false,
                    fileImage: true
                }
            },
            errCode: statusCode.update_file_image_err
        }).then((result: resDoc) => {
            if(!result.isError) {
                if(result.doc.fileImage) {
                    if(fs.existsSync(path.resolve(__dirname, CONFIG.STATIC_IMAGES_PATH + result.doc.fileImage))) {
                        fs.unlink(path.resolve(__dirname, CONFIG.STATIC_IMAGES_PATH + result.doc.fileImage), err => {
                            if(err) {
                                next(err)
                                return
                            }
                        })
                    }
                }
                this.success({}, res, '更新文章背景图片成功')
            }
        })
    }

    getFileDetail: IReqFunction = (req, res, next) => {
        this.findOne(res, next, {
            query: { fileId: req.body.fileId },
            condition: {
                _id: false
            },
            errCode: statusCode.find_file_detail_err
        }).then((doc: resDoc) => {
            if (!doc.isError) {
                this.success({ detail: doc.doc }, res, '获取文章详情成功')
            }
        })
    }

    // getClientIP(req: Request) {
    //     return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    //         req.connection.remoteAddress// 判断 connection 的远程 IP
    // }
}

export const fileInstance: File = File.getInstance()
fileInstance.countFiles("u_768804817990", null, () => { }).then(res => {
    console.log(res)
})
// fileInstance.getLastFileList(null, null, () => { })

// fs.unlinkSync('text.txt')

console.log(path.resolve(__dirname, '../../text.txt'))

if(fs.existsSync(path.resolve(__dirname, '../../text.txt'))) {
    fs.unlink(path.resolve(__dirname, '../../text.txt'), err => {
        if(err) {
            throw err;
        }
        console.log('删除成功')
    })
}

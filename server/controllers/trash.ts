import { DB } from '../public-modules/db'
import { NextFunction, Response, Request } from 'express'
import { userModl } from '../models/user'
import { IReqFunction } from '../interfaces/functions'
import { statusCode } from '../config/statusCode'
import { resDoc } from '../public-modules/public-interfaces'
import { folderInstance } from './folder'
import { fileInstance } from './file'
import { ofs } from '../public-modules/fs'
import { IRestoreFolder, IRestoreFile, IDelFolder, IDelFile } from './../interfaces/trash'

export class Trash extends DB {
    static instance: Trash
    constructor() {
        super('users', userModl)
    }

    static getInstance() {
        if (!Trash.instance) {
            Trash.instance = new Trash()
        }
        return Trash.instance
    }

    clear: IReqFunction = async (req, res, next) => {
        const findFolderListRes: resDoc = await this.findOne(res, next, {
            query: { userId: req.body.userId },
            condition: { _id: false, folderList: true },
            errCode: statusCode.clear_trash_err
        })
        if (findFolderListRes.isError) {
            return
        }
        const folderIdList: Array<string> = []
        const fileIdList: Array<string> = []
        const folderList: Array<any> = findFolderListRes.doc.fileIdList
        folderList.forEach(item => {
            if (item.isDel) {
                folderIdList.push(item.folderId)
            } else {
                item.fileList.forEach(file => {
                    if (file.isDel) {
                        fileIdList.push(file.fileId)
                    }
                })
            }
        })
        if (!await this.delFindAndFolder(folderIdList, fileIdList, req.body.userId, res, next)) {
            return
        }
        this.success({}, res, '清空回收站成功')
    }

    restoreFolder: IReqFunction = (req, res, next) => {
        const params: IRestoreFolder = req.body
        this.updateOne(res, next, {
            query: { userId: params.userId, 'folderList.folderId': params.folderId },
            condition: {
                $set: {
                    'folderList.$.isDel': false
                }
            },
            errCode: statusCode.restore_folder_err
        }).then((result: resDoc) => {
            if (!result.isError) {
                this.success({}, res, '还原文件夹成功')
            }
        })
    }

    restoreFile: IReqFunction = async (req, res, next) => {
        const params: IRestoreFile = req.body
        const restoreResult: resDoc = await folderInstance.updateFileInFolder(res, next, {
            params,
            condition: {
                $set: {
                    'folderList.$[a].fileList.$[b].isDel': false
                }
            },
            errCode: statusCode.restore_file_err
        })
        if (!restoreResult.isError) {
            this.success({}, res, '还原文件成功')
        }
    }

    deleteFolder: IReqFunction = async (req, res, next) => {
        const params: IDelFolder = req.body
        const folderRes: resDoc = await this.findOne(res, next, {
            query: { userId: params.userId, 'folderList.folderId': params.folderId },
            condition: { _id: false, 'folderList.$.folderId': true },
            errCode: statusCode.find_folder_in_delete_err
        })
        if (folderRes.isError) {
            return
        }
        let nextIdList: Array<string> = folderRes.doc.folderList[0].nextIdList
        let fileList: Array<any> = folderRes.doc.folderList[0].fileList
        if (nextIdList.length) {
            const findNextIdRes: resDoc = await this.findOne(res, next, {
                query: { userId: params.userId, 'folderList.folderId': { $in: nextIdList } },
                condition: { _id: false, 'folderList.$.folderId': true },
                errCode: statusCode.find_folder_in_delete_err
            })
            if (findNextIdRes.isError) {
                return
            }
            const tempFolderList: Array<any> = findNextIdRes.doc.folderList
            tempFolderList.forEach(item => {
                nextIdList = nextIdList.concat(item.nextIdList)
                fileList = fileList.concat(item.fileList)
            })
        }
        // push父文件夹
        nextIdList.push(params.folderId)
        const fileIdList: Array<any> = this.getFileList(fileList)
        if (!await this.delFindAndFolder(nextIdList, fileIdList, params.userId, res, next)) {
            return
        }
        this.success({}, res, '从回收站删除文件夹成功')
    }

    async delFindAndFolder(folderIdList: Array<string>, fileIdList: Array<string>, userId: string, res: Response, next: NextFunction) {
        if (!await this.deleteFolderFromDisk(folderIdList, userId, next)) {
            return false
        }
        const deleteFolderRes: resDoc = await this.deleteFolderFromDB(folderIdList, userId, res, next)
        if (deleteFolderRes.isError) {
            return false
        }
        const deleteFileRes: resDoc = await fileInstance.deleteFileFromDB(fileIdList, userId, res, next)
        if (deleteFileRes.isError) {
            return false
        }
        return true
    }

    async deleteFolderFromDisk(folderIdList: Array<string>, userId: string, next: NextFunction) {
        for (let i = 0; i < folderIdList.length; i++) {
            if (!await ofs.rmdir(folderIdList[i], userId, next)) {
                return false
            }
        }
        return true
    }

    deleteFolderFromDB(folderIdList: Array<string>, userId: string, res: Response, next: NextFunction) {
        return this.updateMany(res, next, {
            query: { userId, 'folderList.folderId': { $in: folderIdList } },
            condition: {
                $pull: { folderList: { folderId: { $in: folderIdList } } }
            },
            errCode: statusCode.delete_folder_from_db_err,
            updateArrLength: folderIdList.length
        })
    }


    deleteFile: IReqFunction = async (req, res, next) => {
        const params: IDelFile = req.body
        const deleteFileRes: resDoc = await folderInstance.deleteFileFromFolder(params, res, next)
        if (deleteFileRes.isError) {
            return
        }
        const deleteFromDB: resDoc = await fileInstance.deleteFileFromDB([params.fileId], params.userId, res, next)
        if (deleteFromDB.isError) {
            return
        }
        if (!await ofs.unlink(`${params.fileId}.md`, params.userId, next)) {
            return
        }
        this.success({}, res, '从回收站删除文件成功')
    }

    private getFileList(arr: Array<any>): Array<string> {
        const temp: Array<string> = []
        arr.forEach(item => {
            temp.push(item.fileId)
        })
        return temp
    }
}

export const trashInstance: Trash = Trash.getInstance()

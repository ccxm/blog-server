import { DB } from './../public-modules/db'
import { NextFunction, Response, Request } from 'express'
import { userModl } from './../models/user'
import { IReqFunction } from './../interfaces/functions'
import { INewFile, IUpdateFile, IDeleteFile, IUpdateFileMsg, ICopyFile } from './../interfaces/file'
import { statusCode } from './../config/statusCode'
import { resDoc } from './../public-modules/public-interfaces'
import { createObjectId, createFolderId } from './../utils/utils'
import { INewFolder, IRenameFolder, IDelFolder, ICopyFolder, ICutFolder, IAddChildFolder } from './../interfaces/folder'
import { ofs } from './../public-modules/fs'
import { fileInstance } from './file'

export class Folder extends DB {
    static instance: Folder
    constructor() {
        super('users', userModl)
    }

    static getInstance() {
        if (!Folder.instance) {
            Folder.instance = new Folder()
        }
        return Folder.instance
    }

    // 获取文件夹列表
    getFolderList = async (req: Request, res: Response, next: NextFunction, isResponse: boolean = true) => {
        const result: resDoc = await this.findOne(res, next, {
            query: { userId: req.body.userId },
            condition: {
                _id: false,
                folderList: true
            },
            errCode: statusCode.FIND_FOLDER_LIST_NULL
        })
        if (result.isError) {
            return false
        }
        if (result.doc) {
            if (isResponse) {
                this.success(this.renameNextIdList(this.orderFolder(result.doc.folderList)), res, '获取文件夹列表成功')
            } else {
                return this.renameNextIdList(this.orderFolder(result.doc.folderList))
            }
        }
    }

    // 新建文件夹
    newFolder = async (req: Request, res: Response, next: NextFunction, isCopy: boolean = false, isResponse: boolean = true) => {
        const params: INewFolder = {
            folderName: req.body.folderName,
            preId: req.body.preId,
            folderId: isCopy ? req.body.folderId : createFolderId(),
            fileList: isCopy ? req.body.fileList : []
        }
        const addChildParams: IAddChildFolder = {
            preId: req.body.preId,
            folderId: params.folderId,
        }
        // 向父文件夹添加子文件夹
        if (params.preId) {
            const addChildResult: resDoc = await this.addChildToParentFolder(addChildParams, req.body.userId, res, next)
            if (addChildResult.isError) {
                return false
            }
        }
        // if (!await this.checkNameCanUse(req, res, next, params)) {
        //     return
        // }
        if (!await ofs.mkdir(params.folderId, req.body.userId, next)) {
            return false
        }
        return new Promise(resolve => {
            this.updateOne(res, next, {
                query: { userId: req.body.userId },
                condition: {
                    $push: {
                        folderList: {
                            ...params
                        }
                    }
                },
                errCode: isCopy ? statusCode.copy_folder_err : statusCode.NEW_FOLDER_ERR
            }).then(async (result: resDoc) => {
                if (!result.isError) {
                    if (isResponse) {
                        this.success({
                            ...params
                        }, res, `${isCopy ? '复制' : '新建'}文件夹成功`)
                    }
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    // 重命名文件夹
    renameFolder: IReqFunction = async (req, res, next) => {
        const params: IRenameFolder = req.body
        if (!await this.checkNameCanUse(req, res, next, params)) {
            return
        }
        this.findOneAndUpdate(res, next, {
            query: { userId: req.body.userId, 'folderList.folderId': params.folderId },
            condition: {
                $set: {
                    'folderList.$.folderName': params.folderName
                }
            },
            options: {
                fields: {
                    _id: false,
                    folderList: {
                        $elemMatch: { folderId: params.folderId }
                    }
                }
            },
            errCode: statusCode.RENAME_FOLDER_ERR
        }).then(async (result: resDoc) => {
            if (!result.isError) {
                this.success({ ...params }, res, '重命名文件夹成功')
            }
        })
    }

    // 删除文件夹
    delFolder: IReqFunction = async (req, res, next) => {
        const params: IDelFolder = req.body
        const target: resDoc = await this.findOneAndUpdate(res, next, {
            query: { userId: req.body.userId, 'folderList.folderId': params.folderId },
            condition: {
                $set: {
                    'folderList.$.isDel': true
                }
            },
            options: {
                fields: {
                    _id: false,
                    'folderList.$.folderId': true
                }
            },
            errCode: statusCode.DEL_FOLDER_ERR
        })
        if (target.isError) {
            return
        }
        this.success({}, res, '该文件夹已成功移入回收站，可通过回收站找回')
        // 查找子文件夹，并push该文件夹，一起更新
        // const nextIdList: Array<any> = target.doc.folderList[0].nextIdList
        // nextIdList.push(params.folderId)
        // this.updateMany(res, next, {
        //     query: { userId: req.body.userId, 'folderList.folderId': { $in: nextIdList } },
        //     condition: {
        //         $set: {
        //             'folderList.$.isDel': true
        //         }
        //     },
        //     errCode: statusCode.folder_move_to_trash_err,
        //     updateArrLength: nextIdList.length
        // }).then((result: resDoc) => {
        //     if (!result.isError) {
        //         this.success({}, res, '该文件夹已成功移入回收站，可通过回收站找回')
        //     }
        // })
    }

    // 向文件夹添加子文件夹
    addChildToParentFolder = (params: IAddChildFolder, userId: string, res: Response, next: NextFunction) => {
        return this.updateOne(res, next, {
            query: { userId, 'folderList.folderId': params.preId },
            condition: {
                $push: {
                    'folderList.$.nextIdList': params.folderId
                }
            },
            errCode: statusCode.ADD_CHILD_FOLDER_ERR
        })
    }

    // 向文件夹中添加文件
    addFileToFolder = (params: INewFile, res: Response, next: NextFunction) => {
        return this.findOneAndUpdate(res, next, {
            query: { userId: params.userId, 'folderList.folderId': params.folderId },
            condition: {
                $push: {
                    'folderList.$.fileList': {
                        fileName: params.fileName,
                        fileId: params.fileId
                    }
                }
            },
            options: {
                fields: {
                    _id: false,
                    'folderList.$.folderId': true
                }
            },
            errCode: statusCode.find_target_folder_err
        })
    }

    // 检查文件是否存在文件夹中
    checkFileIsInFolder(params: IUpdateFile, res: Response, next: NextFunction) {
        return this.findOne(res, next, {
            query: {
                userId: params.userId,
                'folderList.folderId': params.folderId,
                'folderList.fileList.fileId': params.fileId
            },
            condition: { _id: false, userId: true },
            errCode: statusCode.find_file_in_folder_err
        })
    }

    // 在文件夹中的文件
    updateFileInFolder(res: Response, next: NextFunction, updateObj: IUpdateFileMsg) {
        return this.updateOne(res, next, {
            query: {
                userId: updateObj.params.userId,
                'folderList.folderId': updateObj.params.folderId,
                'folderList.fileList.fileId': updateObj.params.fileId
            },
            condition: updateObj.condition,
            updateOptions: {
                arrayFilters: [{
                    'a.folderId': updateObj.params.folderId
                }, {
                    'b.fileId': updateObj.params.fileId
                }]
            },
            errCode: updateObj.errCode
        })
    }

    // 统计文件夹的数量


    // 从文件列表中删除文件
    deleteFileFromFolder(params: IDeleteFile, res: Response, next: NextFunction) {
        return this.updateOne(res, next, {
            query: { userId: params.userId, 'folderList.fileList.fileId': params.fileId },
            condition: {
                $pull: {
                    'folderList.$.fileList': { fileId: params.fileId }
                }
            },
            errCode: statusCode.delete_file_from_folder_err
        })
    }

    // 复制文件夹
    copyFolder: IReqFunction = async (req, res, next) => {
        const params: ICopyFile = req.body
        const targetFolder: resDoc = await this.findOne(res, next, {
            query: { userId: params.userId, 'folderList.folderId': params.sourceFolderId },
            condition: { _id: false, 'folderList.$.folderId': true, 'folderList.folderName': true, 'folderList.fileList': true },
            errCode: statusCode.find_folder_err
        })
        if (targetFolder.isError) {
            return
        }
        const newFolderId: string = createFolderId()
        const oldFileList: Array<object> = targetFolder.doc.folderList[0].fileList
        const copyRes: any = await ofs.copyFolder(params.sourceFolderId, newFolderId, params.userId, oldFileList, next)
        if (!copyRes) {
            return
        }
        const insertFilesRes: resDoc = await fileInstance.insertFiles(copyRes, res, next)
        if (insertFilesRes.isError) {
            return
        }
        req.body.folderName = targetFolder.doc.folderList[0].folderName + '_copy'
        req.body.folderId = newFolderId
        req.body.fileList = copyRes
        req.body.preId = params.targetFolderId
        this.newFolder(req, res, next, true)
    }

    // 获取需要复制的文件夹
    getTheCopyFolder: IReqFunction = async (req, res, next) => {
        const folder = await this.getFolderList(req, res, next, false)
        if (!folder) {
            return
        }
    }

    // 剪切文件夹
    cutFolder: IReqFunction = async (req, res, next) => {
        const params: ICutFolder = req.body
        if (params.targetFolderId) {
            const addChildParams: IAddChildFolder = {
                preId: params.targetFolderId,
                folderId: params.sourceFolderId
            }
            const addChildResult: resDoc = await this.addChildToParentFolder(addChildParams, params.userId, res, next)
            if (addChildResult.isError) {
                return
            }
        }
        this.updateOne(res, next, {
            query: { userId: params.userId, 'folderList.folderId': params.sourceFolderId },
            condition: {
                $set: { 'folderList.$.preId': params.targetFolderId }
            },
            errCode: statusCode.cut_folder_err
        }).then((result: resDoc) => {
            if (!result.isError) {
                this.success({}, res, '剪切文件夹成功')
            }
        })
    }

    countFolders(userId: string, res: Response, next: NextFunction) {
        const resDoc: resDoc = {}
        return new Promise(resolve => {
            this.model.aggregate([
                { "$match": { userId } },
                {
                    "$project": { "count": { "$size": "$folderList" } }
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

    // 给文件夹排序
    private orderFolder(folderList: Array<any>): object {
        for (let i = folderList.length - 1; i >= 0; i--) {
            if (folderList[i].preId) {
                const parent = this.findTheFolder(folderList, folderList[i].preId)
                console.log(parent)
                const childIndex = parent.nextIdList.findIndex(item => item === folderList[i].folderId)
                parent.nextIdList[childIndex] = folderList[i]
                folderList.splice(i, 1)
            }
        }
        return this.sortFolder(folderList)
    }


    // 查找某一个文件夹
    private findTheFolder(arr: Array<any>, preId: string): any {
        if (!arr.length) {
            return []
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'object') {
                if (arr[i].folderId === preId) {
                    return arr[i]
                }
                this.findTheFolder(arr[i].nextIdList, preId)
            }
        }
    }

    // 区分回收站与非回收站文件夹
    private sortFolder(arr: Array<any>): object {
        const temp = {
            folderList: [],
            trash: {
                folderName: '回收站',
                folderId: 'trash',
                childFolderList: [],
                fileList: []
            }
        }
        arr.forEach(item => {
            if (item.isDel) {
                temp.trash.childFolderList.push(item)
            } else {
                temp.folderList.push(item)
            }
        })
        console.log(temp)
        temp.trash.fileList = this.findTheDeledFile(temp.folderList, [])
        return temp
    }

    // 找到被删除的文件
    private findTheDeledFile(arr: Array<any>, fileList: Array<any> = []): Array<any> {
        arr.forEach(item => {
            // console.log('item', item)
            item.fileList.forEach(file => {
                if (file.isDel) {
                    fileList.push(file)
                }
            })
            if (item.nextIdList.length) {
                this.findTheDeledFile(item.nextIdList, fileList)
            }
        })
        return fileList
    }

    // 找到要复制的文件夹
    private findTheCopyFolder(arr: Array<any>, folderId: string) {
        arr.forEach(item => {
            if (item.folderId === folderId) {
                return item
            }
            if (item.childFolderList.length) {
                return this.findTheCopyFolder(item.childFolderList, folderId)
            }
        })
    }

    // 重命名nextIdList，方便前端理解
    private renameNextIdList(obj: object): object {
        return JSON.parse(JSON.stringify(obj).replace(/nextIdList/g, 'childFolderList'))
    }

    private async checkNameCanUse(req: Request, res: Response, next: NextFunction, params: any) {
        // 检查文件夹名字是否已经存在
        const folderNameIsExist: resDoc = await this.findFieldIsExist(res, next, {
            query: { userId: req.body.userId, 'folderList.folderName': params.folderName },
            condition: { _id: false, userId: true }
        })
        // 出错了就直接返回
        if (folderNameIsExist.isError) {
            return false
        }
        // 如果重名则提示
        if (folderNameIsExist.doc) {
            this.appoint(statusCode.FOLDER_NAME_IS_EXISTED, res)
            return false
        }
        return true
    }

}

export const folderInstance: Folder = Folder.getInstance()
folderInstance.countFolders("u_768804817990", null, () => { }).then(res => {
    console.log(res)
})

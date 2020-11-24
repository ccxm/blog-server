"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderInstance = exports.Folder = void 0;
const db_1 = require("./../public-modules/db");
const user_1 = require("./../models/user");
const statusCode_1 = require("./../config/statusCode");
const utils_1 = require("./../utils/utils");
const fs_1 = require("./../public-modules/fs");
const file_1 = require("./file");
class Folder extends db_1.DB {
    constructor() {
        super('users', user_1.userModl);
        // 获取文件夹列表
        this.getFolderList = (req, res, next, isResponse = true) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOne(res, next, {
                query: { userId: req.body.userId },
                condition: {
                    _id: false,
                    folderList: true
                },
                errCode: statusCode_1.statusCode.FIND_FOLDER_LIST_NULL
            });
            if (result.isError) {
                return false;
            }
            if (result.doc) {
                if (isResponse) {
                    this.success(this.renameNextIdList(this.orderFolder(result.doc.folderList)), res, '获取文件夹列表成功');
                }
                else {
                    return this.renameNextIdList(this.orderFolder(result.doc.folderList));
                }
            }
        });
        // 新建文件夹
        this.newFolder = (req, res, next, isCopy = false, isResponse = true) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                folderName: req.body.folderName,
                preId: req.body.preId,
                folderId: isCopy ? req.body.folderId : utils_1.createFolderId(),
                fileList: isCopy ? req.body.fileList : []
            };
            const addChildParams = {
                preId: req.body.preId,
                folderId: params.folderId,
            };
            // 向父文件夹添加子文件夹
            if (params.preId) {
                const addChildResult = yield this.addChildToParentFolder(addChildParams, req.body.userId, res, next);
                if (addChildResult.isError) {
                    return false;
                }
            }
            // if (!await this.checkNameCanUse(req, res, next, params)) {
            //     return
            // }
            if (!(yield fs_1.ofs.mkdir(params.folderId, req.body.userId, next))) {
                return false;
            }
            return new Promise(resolve => {
                this.updateOne(res, next, {
                    query: { userId: req.body.userId },
                    condition: {
                        $push: {
                            folderList: Object.assign({}, params)
                        }
                    },
                    errCode: isCopy ? statusCode_1.statusCode.copy_folder_err : statusCode_1.statusCode.NEW_FOLDER_ERR
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (!result.isError) {
                        if (isResponse) {
                            this.success(Object.assign({}, params), res, `${isCopy ? '复制' : '新建'}文件夹成功`);
                        }
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }));
            });
        });
        // 重命名文件夹
        this.renameFolder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            if (!(yield this.checkNameCanUse(req, res, next, params))) {
                return;
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
                errCode: statusCode_1.statusCode.RENAME_FOLDER_ERR
            }).then((result) => __awaiter(this, void 0, void 0, function* () {
                if (!result.isError) {
                    this.success(Object.assign({}, params), res, '重命名文件夹成功');
                }
            }));
        });
        // 删除文件夹
        this.delFolder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const target = yield this.findOneAndUpdate(res, next, {
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
                errCode: statusCode_1.statusCode.DEL_FOLDER_ERR
            });
            if (target.isError) {
                return;
            }
            this.success({}, res, '该文件夹已成功移入回收站，可通过回收站找回');
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
        });
        // 向文件夹添加子文件夹
        this.addChildToParentFolder = (params, userId, res, next) => {
            return this.updateOne(res, next, {
                query: { userId, 'folderList.folderId': params.preId },
                condition: {
                    $push: {
                        'folderList.$.nextIdList': params.folderId
                    }
                },
                errCode: statusCode_1.statusCode.ADD_CHILD_FOLDER_ERR
            });
        };
        // 向文件夹中添加文件
        this.addFileToFolder = (params, res, next) => {
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
                errCode: statusCode_1.statusCode.find_target_folder_err
            });
        };
        // 复制文件夹
        this.copyFolder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const targetFolder = yield this.findOne(res, next, {
                query: { userId: params.userId, 'folderList.folderId': params.sourceFolderId },
                condition: { _id: false, 'folderList.$.folderId': true, 'folderList.folderName': true, 'folderList.fileList': true },
                errCode: statusCode_1.statusCode.find_folder_err
            });
            if (targetFolder.isError) {
                return;
            }
            const newFolderId = utils_1.createFolderId();
            const oldFileList = targetFolder.doc.folderList[0].fileList;
            const copyRes = yield fs_1.ofs.copyFolder(params.sourceFolderId, newFolderId, params.userId, oldFileList, next);
            if (!copyRes) {
                return;
            }
            const insertFilesRes = yield file_1.fileInstance.insertFiles(copyRes, res, next);
            if (insertFilesRes.isError) {
                return;
            }
            req.body.folderName = targetFolder.doc.folderList[0].folderName + '_copy';
            req.body.folderId = newFolderId;
            req.body.fileList = copyRes;
            req.body.preId = params.targetFolderId;
            this.newFolder(req, res, next, true);
        });
        // 获取需要复制的文件夹
        this.getTheCopyFolder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const folder = yield this.getFolderList(req, res, next, false);
            if (!folder) {
                return;
            }
        });
        // 剪切文件夹
        this.cutFolder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            if (params.targetFolderId) {
                const addChildParams = {
                    preId: params.targetFolderId,
                    folderId: params.sourceFolderId
                };
                const addChildResult = yield this.addChildToParentFolder(addChildParams, params.userId, res, next);
                if (addChildResult.isError) {
                    return;
                }
            }
            this.updateOne(res, next, {
                query: { userId: params.userId, 'folderList.folderId': params.sourceFolderId },
                condition: {
                    $set: { 'folderList.$.preId': params.targetFolderId }
                },
                errCode: statusCode_1.statusCode.cut_folder_err
            }).then((result) => {
                if (!result.isError) {
                    this.success({}, res, '剪切文件夹成功');
                }
            });
        });
    }
    static getInstance() {
        if (!Folder.instance) {
            Folder.instance = new Folder();
        }
        return Folder.instance;
    }
    // 检查文件是否存在文件夹中
    checkFileIsInFolder(params, res, next) {
        return this.findOne(res, next, {
            query: {
                userId: params.userId,
                'folderList.folderId': params.folderId,
                'folderList.fileList.fileId': params.fileId
            },
            condition: { _id: false, userId: true },
            errCode: statusCode_1.statusCode.find_file_in_folder_err
        });
    }
    // 在文件夹中的文件
    updateFileInFolder(res, next, updateObj) {
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
        });
    }
    // 统计文件夹的数量
    // 从文件列表中删除文件
    deleteFileFromFolder(params, res, next) {
        return this.updateOne(res, next, {
            query: { userId: params.userId, 'folderList.fileList.fileId': params.fileId },
            condition: {
                $pull: {
                    'folderList.$.fileList': { fileId: params.fileId }
                }
            },
            errCode: statusCode_1.statusCode.delete_file_from_folder_err
        });
    }
    countFolders(userId, res, next) {
        const resDoc = {};
        return new Promise(resolve => {
            this.model.aggregate([
                { "$match": { userId } },
                {
                    "$project": { "count": { "$size": "$folderList" } }
                }
            ]).then((doc) => {
                resDoc.doc = {
                    count: doc[0].count
                };
                resolve(resDoc);
            }).catch(err => {
                resDoc.isError = true;
                next(err);
                resolve(resDoc);
            });
        });
    }
    // 给文件夹排序
    orderFolder(folderList) {
        for (let i = folderList.length - 1; i >= 0; i--) {
            if (folderList[i].preId) {
                const parent = this.findTheFolder(folderList, folderList[i].preId);
                console.log(parent);
                const childIndex = parent.nextIdList.findIndex(item => item === folderList[i].folderId);
                parent.nextIdList[childIndex] = folderList[i];
                folderList.splice(i, 1);
            }
        }
        return this.sortFolder(folderList);
    }
    // 查找某一个文件夹
    findTheFolder(arr, preId) {
        if (!arr.length) {
            return [];
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'object') {
                if (arr[i].folderId === preId) {
                    return arr[i];
                }
                this.findTheFolder(arr[i].nextIdList, preId);
            }
        }
    }
    // 区分回收站与非回收站文件夹
    sortFolder(arr) {
        const temp = {
            folderList: [],
            trash: {
                folderName: '回收站',
                folderId: 'trash',
                childFolderList: [],
                fileList: []
            }
        };
        arr.forEach(item => {
            if (item.isDel) {
                temp.trash.childFolderList.push(item);
            }
            else {
                temp.folderList.push(item);
            }
        });
        console.log(temp);
        temp.trash.fileList = this.findTheDeledFile(temp.folderList, []);
        return temp;
    }
    // 找到被删除的文件
    findTheDeledFile(arr, fileList = []) {
        arr.forEach(item => {
            // console.log('item', item)
            item.fileList.forEach(file => {
                if (file.isDel) {
                    fileList.push(file);
                }
            });
            if (item.nextIdList.length) {
                this.findTheDeledFile(item.nextIdList, fileList);
            }
        });
        return fileList;
    }
    // 找到要复制的文件夹
    findTheCopyFolder(arr, folderId) {
        arr.forEach(item => {
            if (item.folderId === folderId) {
                return item;
            }
            if (item.childFolderList.length) {
                return this.findTheCopyFolder(item.childFolderList, folderId);
            }
        });
    }
    // 重命名nextIdList，方便前端理解
    renameNextIdList(obj) {
        return JSON.parse(JSON.stringify(obj).replace(/nextIdList/g, 'childFolderList'));
    }
    checkNameCanUse(req, res, next, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // 检查文件夹名字是否已经存在
            const folderNameIsExist = yield this.findFieldIsExist(res, next, {
                query: { userId: req.body.userId, 'folderList.folderName': params.folderName },
                condition: { _id: false, userId: true }
            });
            // 出错了就直接返回
            if (folderNameIsExist.isError) {
                return false;
            }
            // 如果重名则提示
            if (folderNameIsExist.doc) {
                this.appoint(statusCode_1.statusCode.FOLDER_NAME_IS_EXISTED, res);
                return false;
            }
            return true;
        });
    }
}
exports.Folder = Folder;
exports.folderInstance = Folder.getInstance();
exports.folderInstance.countFolders("u_768804817990", null, () => { }).then(res => {
    console.log(res);
});
//# sourceMappingURL=folder.js.map
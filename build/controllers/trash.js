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
exports.trashInstance = exports.Trash = void 0;
const db_1 = require("../public-modules/db");
const user_1 = require("../models/user");
const statusCode_1 = require("../config/statusCode");
const folder_1 = require("./folder");
const file_1 = require("./file");
const fs_1 = require("../public-modules/fs");
class Trash extends db_1.DB {
    constructor() {
        super('users', user_1.userModl);
        this.clear = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const findFolderListRes = yield this.findOne(res, next, {
                query: { userId: req.body.userId },
                condition: { _id: false, folderList: true },
                errCode: statusCode_1.statusCode.clear_trash_err
            });
            if (findFolderListRes.isError) {
                return;
            }
            const folderIdList = [];
            const fileIdList = [];
            const folderList = findFolderListRes.doc.fileIdList;
            folderList.forEach(item => {
                if (item.isDel) {
                    folderIdList.push(item.folderId);
                }
                else {
                    item.fileList.forEach(file => {
                        if (file.isDel) {
                            fileIdList.push(file.fileId);
                        }
                    });
                }
            });
            if (!(yield this.delFindAndFolder(folderIdList, fileIdList, req.body.userId, res, next))) {
                return;
            }
            this.success({}, res, '清空回收站成功');
        });
        this.restoreFolder = (req, res, next) => {
            const params = req.body;
            this.updateOne(res, next, {
                query: { userId: params.userId, 'folderList.folderId': params.folderId },
                condition: {
                    $set: {
                        'folderList.$.isDel': false
                    }
                },
                errCode: statusCode_1.statusCode.restore_folder_err
            }).then((result) => {
                if (!result.isError) {
                    this.success({}, res, '还原文件夹成功');
                }
            });
        };
        this.restoreFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const restoreResult = yield folder_1.folderInstance.updateFileInFolder(res, next, {
                params,
                condition: {
                    $set: {
                        'folderList.$[a].fileList.$[b].isDel': false
                    }
                },
                errCode: statusCode_1.statusCode.restore_file_err
            });
            if (!restoreResult.isError) {
                this.success({}, res, '还原文件成功');
            }
        });
        this.deleteFolder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const folderRes = yield this.findOne(res, next, {
                query: { userId: params.userId, 'folderList.folderId': params.folderId },
                condition: { _id: false, 'folderList.$.folderId': true },
                errCode: statusCode_1.statusCode.find_folder_in_delete_err
            });
            if (folderRes.isError) {
                return;
            }
            let nextIdList = folderRes.doc.folderList[0].nextIdList;
            let fileList = folderRes.doc.folderList[0].fileList;
            if (nextIdList.length) {
                const findNextIdRes = yield this.findOne(res, next, {
                    query: { userId: params.userId, 'folderList.folderId': { $in: nextIdList } },
                    condition: { _id: false, 'folderList.$.folderId': true },
                    errCode: statusCode_1.statusCode.find_folder_in_delete_err
                });
                if (findNextIdRes.isError) {
                    return;
                }
                const tempFolderList = findNextIdRes.doc.folderList;
                tempFolderList.forEach(item => {
                    nextIdList = nextIdList.concat(item.nextIdList);
                    fileList = fileList.concat(item.fileList);
                });
            }
            // push父文件夹
            nextIdList.push(params.folderId);
            const fileIdList = this.getFileList(fileList);
            if (!(yield this.delFindAndFolder(nextIdList, fileIdList, params.userId, res, next))) {
                return;
            }
            this.success({}, res, '从回收站删除文件夹成功');
        });
        this.deleteFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const deleteFileRes = yield folder_1.folderInstance.deleteFileFromFolder(params, res, next);
            if (deleteFileRes.isError) {
                return;
            }
            const deleteFromDB = yield file_1.fileInstance.deleteFileFromDB([params.fileId], params.userId, res, next);
            if (deleteFromDB.isError) {
                return;
            }
            if (!(yield fs_1.ofs.unlink(`${params.fileId}.md`, params.userId, next))) {
                return;
            }
            this.success({}, res, '从回收站删除文件成功');
        });
    }
    static getInstance() {
        if (!Trash.instance) {
            Trash.instance = new Trash();
        }
        return Trash.instance;
    }
    delFindAndFolder(folderIdList, fileIdList, userId, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.deleteFolderFromDisk(folderIdList, userId, next))) {
                return false;
            }
            const deleteFolderRes = yield this.deleteFolderFromDB(folderIdList, userId, res, next);
            if (deleteFolderRes.isError) {
                return false;
            }
            const deleteFileRes = yield file_1.fileInstance.deleteFileFromDB(fileIdList, userId, res, next);
            if (deleteFileRes.isError) {
                return false;
            }
            return true;
        });
    }
    deleteFolderFromDisk(folderIdList, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < folderIdList.length; i++) {
                if (!(yield fs_1.ofs.rmdir(folderIdList[i], userId, next))) {
                    return false;
                }
            }
            return true;
        });
    }
    deleteFolderFromDB(folderIdList, userId, res, next) {
        return this.updateMany(res, next, {
            query: { userId, 'folderList.folderId': { $in: folderIdList } },
            condition: {
                $pull: { folderList: { folderId: { $in: folderIdList } } }
            },
            errCode: statusCode_1.statusCode.delete_folder_from_db_err,
            updateArrLength: folderIdList.length
        });
    }
    getFileList(arr) {
        const temp = [];
        arr.forEach(item => {
            temp.push(item.fileId);
        });
        return temp;
    }
}
exports.Trash = Trash;
exports.trashInstance = Trash.getInstance();
//# sourceMappingURL=trash.js.map
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
exports.fileInstance = exports.File = void 0;
const db_1 = require("../public-modules/db");
const file_1 = require("../models/file");
const statusCode_1 = require("../config/statusCode");
const utils_1 = require("../utils/utils");
const folder_1 = require("./folder");
const gather_1 = require("./gather");
const fs_1 = require("../public-modules/fs");
const fs = require("fs");
const config_1 = require("../config/config");
const path = require("path");
class File extends db_1.DB {
    constructor() {
        super('files', file_1.fileModel);
        this.pageViewMap = new Map();
        this.newFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                fileName: req.body.fileName,
                folderId: req.body.folderId,
                fileId: utils_1.createFileId(),
                userId: req.body.userId,
            };
            const isFolderExist = yield folder_1.folderInstance.addFileToFolder(params, res, next);
            if (isFolderExist.isError) {
                return;
            }
            this.create(res, next, {
                query: params
            }).then((result) => __awaiter(this, void 0, void 0, function* () {
                if (!result.isError) {
                    if (yield fs_1.ofs.writeFile('', `${params.folderId}//${params.fileId}.md`, params.userId, next)) {
                        delete params['userId'];
                        this.success(params, res, '新建文件成功');
                    }
                }
            }));
        });
        this.updateFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const updateTagParams = {
                fileId: params.fileId,
                isDel: false,
                tagList: req.body.tagList,
                userId: params.userId
            };
            const updateTagError = yield gather_1.gatherInstance.updateTag(updateTagParams, res, next);
            const checkFileInFolder = yield folder_1.folderInstance.checkFileIsInFolder(params, res, next);
            if (checkFileInFolder.isError || updateTagError) {
                return;
            }
            if (yield fs_1.ofs.writeFile(params.fileContent, `${params.folderId}//${params.fileId}.md`, params.userId, next)) {
                this.success({}, res, '更新文件成功');
            }
        });
        this.renameFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const updateNameResult = yield folder_1.folderInstance.updateFileInFolder(res, next, {
                params,
                condition: {
                    $set: {
                        'folderList.$[a].fileList.$[b].fileName': params.newFileName
                    }
                },
                errCode: statusCode_1.statusCode.update_name_in_folder_err
            });
            if (updateNameResult.isError) {
                return;
            }
            this.updateOne(res, next, {
                query: { userId: params.userId, fileId: params.fileId },
                condition: {
                    $set: { fileName: params.newFileName }
                },
                errCode: statusCode_1.statusCode.update_name_in_file_err
            }).then((result) => {
                if (!result.isError) {
                    this.success({}, res, '重命名文件成功');
                }
            });
        });
        this.deleteFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const delResult = yield folder_1.folderInstance.updateFileInFolder(res, next, {
                params,
                condition: {
                    $set: {
                        'folderList.$[a].fileList.$[b].isDel': true
                    }
                },
                errCode: statusCode_1.statusCode.delete_file_in_folder_err
            });
            if (!delResult.isError) {
                this.success({}, res, '该文件已成功移入回收站，可通过回收站找回');
            }
        });
        // 生成新文件，为复制剪切做准备
        this.createNewFile = (req, res, next, isCut = false) => __awaiter(this, void 0, void 0, function* () {
            const params = req.body;
            const findFileRes = yield this.findOne(res, next, {
                query: { userId: params.userId, fileId: params.fileId, folderId: params.sourceFolderId },
                condition: { _id: false, fileName: true },
                errCode: statusCode_1.statusCode.find_file_err
            });
            if (findFileRes.isError) {
                return false;
            }
            params.fileName = findFileRes.doc.fileName;
            const newParams = {
                fileName: isCut ? params.fileName : `${params.fileName}_copy`,
                folderId: params.targetFolderId,
                fileId: utils_1.createFileId(),
                userId: params.userId,
            };
            const newFileRes = yield this.create(res, next, {
                query: newParams
            });
            if (newFileRes.isError) {
                return false;
            }
            const isFolderExist = yield folder_1.folderInstance.addFileToFolder(newParams, res, next);
            if (isFolderExist.isError) {
                return false;
            }
            return newParams;
        });
        this.copyFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newParams = yield this.createNewFile(req, res, next);
            if (!newParams) {
                return;
            }
            const params = req.body;
            const copyRes = yield fs_1.ofs.copyFile(`${params.sourceFolderId}//${params.fileId}.md`, `${params.targetFolderId}//${newParams.fileId}.md`, params.userId, next);
            if (copyRes) {
                delete newParams['userId'];
                this.success({ newFile: newParams }, res, '复制文件成功');
                return true;
            }
        });
        this.cutFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newParams = yield this.createNewFile(req, res, next);
            if (!newParams) {
                return;
            }
            const params = req.body;
            const cutRes = yield fs_1.ofs.renameFile(`${params.sourceFolderId}//${params.fileId}.md`, `${params.targetFolderId}//${newParams.fileId}.md`, params.userId, next);
            if (cutRes) {
                const deleteParams = {
                    fileId: params.fileId,
                    userId: params.userId
                };
                const deleteRes = yield folder_1.folderInstance.deleteFileFromFolder(deleteParams, res, next);
                if (!deleteRes.isError) {
                    this.deleteOne(res, next, {
                        query: { userId: params.userId, fileId: params.fileId },
                        errCode: statusCode_1.statusCode.cut_file_null
                    }).then((result) => {
                        if (!result.isError) {
                            this.success({ cutFile: newParams }, res, '剪切文件成功');
                        }
                    });
                }
            }
        });
        this.getLastFileList = (req, res, next) => {
            this.model.find({ userId: req.body.userId }, {
                _id: false
            }).sort({ createdAt: -1 }).limit(5).then(doc => {
                this.success({ lastArticleList: doc }, res, '获取最新文章列表成功');
            }).catch(err => {
                next(err);
            });
        };
        this.getFileList = (req, res, next) => {
            console.log(req.ip);
            this.model.find({ userId: req.body.userId }, {
                _id: false
            }).sort({ createdAt: -1 }).then(doc => {
                this.success({ articleList: doc }, res, '获取文章列表成功');
            }).catch(err => {
                next(err);
            });
        };
        this.updatePageView = (req, res, next) => {
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
                errCode: statusCode_1.statusCode.update_page_view_err
            }).then((doc) => {
                if (!doc.isError) {
                    this.success(doc.doc, res, '更新浏览量成功');
                }
            });
        };
        // 更新文章图片链接
        this.updateFileImage = (req, res, next) => {
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
                errCode: statusCode_1.statusCode.update_file_image_err
            }).then((result) => {
                if (!result.isError) {
                    if (result.doc.fileImage) {
                        if (fs.existsSync(path.resolve(__dirname, config_1.CONFIG.STATIC_IMAGES_PATH + result.doc.fileImage))) {
                            fs.unlink(path.resolve(__dirname, config_1.CONFIG.STATIC_IMAGES_PATH + result.doc.fileImage), err => {
                                if (err) {
                                    next(err);
                                    return;
                                }
                            });
                        }
                    }
                    this.success({}, res, '更新文章背景图片成功');
                }
            });
        };
        this.getFileDetail = (req, res, next) => {
            this.findOne(res, next, {
                query: { fileId: req.body.fileId },
                condition: {
                    _id: false
                },
                errCode: statusCode_1.statusCode.find_file_detail_err
            }).then((doc) => {
                if (!doc.isError) {
                    this.success({ detail: doc.doc }, res, '获取文章详情成功');
                }
            });
        };
    }
    static getInstance() {
        if (!File.instance) {
            File.instance = new File();
        }
        return File.instance;
    }
    insertFiles(fileList, res, next) {
        return this.insertMany(res, next, {
            query: fileList
        });
    }
    deleteFileFromDB(fileIdList, userId, res, next) {
        return this.deleteMany(res, next, {
            query: { userId, fileId: { $in: fileIdList } },
            errCode: statusCode_1.statusCode.delete_file_from_db_err,
            updateArrLength: fileIdList.length
        });
    }
    countFiles(userId, res, next) {
        const resDoc = {};
        return new Promise(resolve => {
            this.model.countDocuments({ userId }).then(count => {
                resDoc.doc = {
                    count
                };
                console.log(count);
                resolve(resDoc);
            }).catch(err => {
                resDoc.isError = true;
                next(err);
                console.log(err);
                resolve(resDoc);
            });
        });
    }
}
exports.File = File;
exports.fileInstance = File.getInstance();
exports.fileInstance.countFiles("u_768804817990", null, () => { }).then(res => {
    console.log(res);
});
// fileInstance.getLastFileList(null, null, () => { })
// fs.unlinkSync('text.txt')
console.log(path.resolve(__dirname, '../../text.txt'));
if (fs.existsSync(path.resolve(__dirname, '../../text.txt'))) {
    fs.unlink(path.resolve(__dirname, '../../text.txt'), err => {
        if (err) {
            throw err;
        }
        console.log('删除成功');
    });
}
//# sourceMappingURL=file.js.map
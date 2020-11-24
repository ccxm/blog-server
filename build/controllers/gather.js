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
exports.gatherInstance = exports.Gather = void 0;
const db_1 = require("../public-modules/db");
const gather_1 = require("../models/gather");
const statusCode_1 = require("../config/statusCode");
const utils_1 = require("../utils/utils");
const constant_1 = require("./../config/constant");
class Gather extends db_1.DB {
    constructor() {
        super('gathers', gather_1.gatherModel);
        // 加入文件，即文章
        this.updateArticleList = (params, res, next) => __awaiter(this, void 0, void 0, function* () {
            const temp = {
                fileId: params.fileId,
                folderId: params.folderId
            };
            const condition = params.isDel ? { $pull: { fileList: temp } } : { $addToSet: { fileList: temp } };
            const result = yield this.updateOne(res, next, {
                query: { userId: params.userId },
                condition,
                isNotResponseError: true
            });
            return result.isError;
        });
        // 加入文件夹，即分类
        this.updateSortList = (params, res, next) => __awaiter(this, void 0, void 0, function* () {
            const condition = params.isDel ? { $pull: { folderList: params.folderId } } : { $addToSet: { folderList: params.folderId } };
            const result = yield this.updateOne(res, next, {
                query: { userId: params.userId },
                condition,
                isNotResponseError: true
            });
            return result.isError;
        });
        this.createGather = (userId, res, next) => {
            return this.create(res, next, {
                query: { userId, tagList: this.createTag() }
            });
        };
        // 获取标签列表
        this.getTagList = (req, res, next) => {
            this.findOne(res, next, {
                query: { userId: req.body.userId },
                condition: {
                    _id: false,
                    tagList: true
                },
                errCode: statusCode_1.statusCode.find_tag_error
            }).then((doc) => {
                if (!doc.isError) {
                    this.success(doc.doc, res, '获取标签列表成功');
                }
            });
        };
        // 新增tag
        this.addTag = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const findResult = yield this.findFieldIsExist(res, next, {
                query: { userId: req.body.userId, 'tagList.tagName': req.body.tagName },
                errCode: statusCode_1.statusCode.tag_is_existed
            });
            if (findResult.isError) {
                return;
            }
            if (findResult.doc) {
                this.appoint(statusCode_1.statusCode.tag_is_existed, res);
                return;
            }
            const newTag = {
                tagName: req.body.tagName,
                tagId: utils_1.createTagId()
            };
            const result = yield this.updateOne(res, next, {
                query: { userId: req.body.userId },
                condition: { $push: { tagList: newTag } },
                errCode: statusCode_1.statusCode.new_tag_error
            });
            if (result.isError) {
                return;
            }
            this.success(newTag, res, '新增标签成功');
        });
        // 更新标签
        this.updateTag = (params, res, next) => __awaiter(this, void 0, void 0, function* () {
            const condition = params.isDel ? { $pull: { 'tagList.$[a].list': params.fileId } } : { $addToSet: { 'tagList.$[a].fileList': params.fileId } };
            const result = yield this.updateOne(res, next, {
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
            });
            return result.isError;
        });
    }
    static getInstance() {
        if (!Gather.instance) {
            Gather.instance = new Gather();
        }
        return Gather.instance;
    }
    // 创建标签
    createTag() {
        const arr = [];
        constant_1.defaultTag.forEach(item => {
            arr.push({
                tagId: utils_1.createTagId(),
                tagName: item
            });
        });
        return arr;
    }
    // 计算标签的数量
    countTags(userId, res, next) {
        const resDoc = {};
        return new Promise(resolve => {
            this.model.aggregate([
                { "$match": { userId } },
                {
                    "$project": { "count": { "$size": "$tagList" } }
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
}
exports.Gather = Gather;
exports.gatherInstance = Gather.getInstance();
// gatherInstance.createGather('u_768804817990', null, null).then(res => {
//     // console.log(res.isError)
// })
//# sourceMappingURL=gather.js.map
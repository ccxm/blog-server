"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModl = exports.userInfoModel = exports.trashModel = exports.labelModel = exports.folderModel = exports.fileModel = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("./../config/config");
exports.fileModel = new mongoose_1.Schema({
    fileId: String,
    fileName: String,
    isDel: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, versionKey: false, _id: false });
exports.folderModel = new mongoose_1.Schema({
    folderId: {
        type: String,
        unique: true
    },
    folderName: String,
    preId: String,
    isDel: {
        type: Boolean,
        default: false
    },
    nextIdList: [],
    fileList: [exports.fileModel]
}, { timestamps: true, versionKey: false, _id: false });
exports.labelModel = new mongoose_1.Schema({
    labelId: String,
    labelName: String,
    files: Array,
    totalNum: Number
}, { timestamps: false, versionKey: false, _id: false });
exports.trashModel = new mongoose_1.Schema({
    folderName: {
        type: String,
        default: '回收站'
    },
    folderId: {
        type: String,
        default: config_1.CONFIG.TRASH_ID
    },
    preId: {
        type: String,
        default: null
    },
    nextId: {
        type: String,
        default: null
    },
    fileList: [exports.fileModel],
    folderList: []
}, { timestamps: false, versionKey: false, _id: false });
exports.userInfoModel = new mongoose_1.Schema({
    motto: String,
    github: String,
    email: String,
    avatarUrl: String,
    tempUrl: {
        type: String,
        default: ''
    }
});
exports.userModl = new mongoose_1.Schema({
    userId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    nickName: {
        type: String,
        unique: true
    },
    pageView: {
        type: Number,
        default: 0
    },
    password: String,
    folderList: [exports.folderModel],
    trash: exports.trashModel,
    userInfo: exports.userInfoModel,
    submitRecode: Array,
    labelList: [exports.labelModel],
    topArticles: [exports.fileModel],
    lastArticle: [exports.fileModel]
}, { timestamps: true, versionKey: false });
//# sourceMappingURL=user.js.map
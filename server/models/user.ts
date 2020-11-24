import { Schema } from 'mongoose'
import { CONFIG } from './../config/config'

export const fileModel = new Schema({
    fileId: String,
    fileName: String,
    isDel: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, versionKey: false, _id: false })

export const folderModel = new Schema({
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
    fileList: [fileModel]
}, { timestamps: true, versionKey: false, _id: false })

export const labelModel = new Schema({
    labelId: String,
    labelName: String,
    files: Array,
    totalNum: Number
}, { timestamps: false, versionKey: false, _id: false })

export const trashModel = new Schema({
    folderName: {
        type: String,
        default: '回收站'
    },
    folderId: {
        type: String,
        default: CONFIG.TRASH_ID
    },
    preId: {
        type: String,
        default: null
    },
    nextId: {
        type: String,
        default: null
    },
    fileList: [fileModel],
    folderList: []
}, { timestamps: false, versionKey: false, _id: false })

export const userInfoModel = new Schema({
    motto: String,
    github: String,
    email: String,
    avatarUrl: String,
    tempUrl: {
        type: String,
        default: ''
    }
})

export const userModl = new Schema({
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
    folderList: [folderModel],
    trash: trashModel,
    userInfo: userInfoModel,
    submitRecode: Array,
    labelList: [labelModel],
    topArticles: [fileModel],
    lastArticle: [fileModel]
}, { timestamps: true, versionKey: false })
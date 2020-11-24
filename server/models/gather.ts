import { Schema } from 'mongoose'

export const tagModel = new Schema({
    tagId: String,
    tagName: String,
    fileList: {
        type: Array,
        default: []
    }
}, { timestamps: false, versionKey: false, _id: false })

export const fileItemModal = new Schema({
    fileId: String,
    folderId: String
}, { timestamps: true, versionKey: false, _id: false })

export const gatherModel = new Schema({
    userId: String,
    folderList: Array,
    fileList: [fileItemModal],
    tagList: [tagModel]
}, { timestamps: true, versionKey: false })
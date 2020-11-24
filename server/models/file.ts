import { Schema } from 'mongoose'

export const fileModel = new Schema({
    fileId: {
        type: String,
        unique: true
    },
    userId: String,
    fileName: String,
    fileTitle: String,
    folderId: String,
    fileImage: String,
    pageView: {
        type: Number,
        default: 0
    }    // 被浏览的次数
}, { timestamps: true, versionKey: false })

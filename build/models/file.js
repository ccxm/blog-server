"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileModel = void 0;
const mongoose_1 = require("mongoose");
exports.fileModel = new mongoose_1.Schema({
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
    } // 被浏览的次数
}, { timestamps: true, versionKey: false });
//# sourceMappingURL=file.js.map
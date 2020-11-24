"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherModel = exports.fileItemModal = exports.tagModel = void 0;
const mongoose_1 = require("mongoose");
exports.tagModel = new mongoose_1.Schema({
    tagId: String,
    tagName: String,
    fileList: {
        type: Array,
        default: []
    }
}, { timestamps: false, versionKey: false, _id: false });
exports.fileItemModal = new mongoose_1.Schema({
    fileId: String,
    folderId: String
}, { timestamps: true, versionKey: false, _id: false });
exports.gatherModel = new mongoose_1.Schema({
    userId: String,
    folderList: Array,
    fileList: [exports.fileItemModal],
    tagList: [exports.tagModel]
}, { timestamps: true, versionKey: false });
//# sourceMappingURL=gather.js.map
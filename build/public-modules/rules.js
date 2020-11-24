"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const utils_1 = require("./../utils/utils");
exports.rules = Object.freeze({
    '/user/register': {
        email: utils_1.testEmail,
        password: utils_1.testPassword,
        verifyCode: utils_1.testVerifyCode
    },
    '/user/login': {
        email: utils_1.testEmail,
        password: utils_1.testPassword
    },
    '/folder/new-folder': {
        userId: '',
        folderName: '',
        preId: 'optional'
    },
    '/folder/get-folder-list': {
        userId: '',
    },
    '/folder/put-rename': {
        userId: '',
        folderId: '',
        folderName: ''
    },
    '/folder/delete-rename': {
        userId: '',
        folderId: ''
    },
    '/folder/copy': {
        userId: '',
        sourceFolderId: '',
        targetFolderId: 'optional'
    },
    '/folder/cut': {
        userId: '',
        sourceFolderId: '',
        targetFolderId: 'optional'
    },
    '/file/new-file': {
        userId: '',
        folderId: '',
        fileName: ''
    },
    '/file/put-file': {
        userId: '',
        folderId: '',
        fileId: '',
        fileContent: ''
    },
    '/file/delete-file': {
        userId: '',
        folderId: '',
        fileId: ''
    },
    '/file/rename': {
        userId: '',
        folderId: '',
        fileId: '',
        newFileName: ''
    },
    '/file/copy': {
        sourceFolderId: '',
        targetFolderId: '',
        fileId: ''
    },
    '/file/cut': {
        sourceFolderId: '',
        targetFolderId: '',
        fileId: ''
    },
    '/file/page-view': {
        fileId: ''
    },
    '/file/detail': {
        fileId: ''
    },
    'trash/restore-folder': {
        folderId: ''
    },
    'trash/restore-file': {
        folderId: '',
        fileId: ''
    },
    'trash/delete-folder': {
        folderId: ''
    },
    'trash/delete-file': {
        fileId: ''
    },
    'trash/clear': {
        userId: ''
    }
});
//# sourceMappingURL=rules.js.map
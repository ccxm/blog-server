"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_id = exports.testVerifyCode = exports.testPassword = exports.testEmail = exports.createVerifyCode = exports.createTagId = exports.createFolderId = exports.createFileId = exports.createObjectId = exports.createUuid = void 0;
// 生成用户id
exports.createUuid = (len = 12) => {
    let uuid = [];
    for (let i = 0; i < len; i++) {
        const num = Math.floor(Math.random() * 10);
        // 第一位不能为0
        if (!i && !num) {
            i = 0;
            continue;
        }
        uuid[i] = num;
    }
    return 'u_' + uuid.join('');
};
// 生成ObjectId
exports.createObjectId = (len = 12) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
    let str = '', charsLength = chars.length;
    for (let i = 0; i < len; i++) {
        str += chars[Math.floor(Math.random() * charsLength)];
    }
    return str;
};
exports.createFileId = () => {
    return 'f_' + exports.createObjectId();
};
exports.createFolderId = () => {
    return 'd_' + exports.createObjectId();
};
exports.createTagId = () => {
    return 't_' + exports.createObjectId();
};
// 生成6位验证码
exports.createVerifyCode = (len = 6) => {
    let str = '';
    for (let i = 0; i < len; i++) {
        if (!i) {
            str += Math.ceil(Math.random() * 9);
        }
        else {
            str += Math.floor(Math.random() * 10);
        }
    }
    return parseInt(str);
};
// 验证邮箱
exports.testEmail = (email, key) => {
    const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
    if (reg.test(email)) {
        return '';
    }
    else {
        return '邮箱格式不正确；';
    }
};
// 验证密码
exports.testPassword = (password, key) => {
    const reg = /^(\w){6,20}$/;
    if (reg.test(password)) {
        return '';
    }
    else {
        return '密码格式不正确；';
    }
};
// 验证验证码
exports.testVerifyCode = (verifyCode, key) => {
    const reg = /^[0-9]{6}$/;
    if (reg.test(verifyCode)) {
        return '';
    }
    else {
        return `${key}格式不正确；`;
    }
};
// 验证数据库的_id
exports.test_id = (_id, key) => {
    const reg = /^[0-9a-fA-F]{24}$/;
    if (reg.test(_id)) {
        return '';
    }
    else {
        return `${key}格式不正确，必须为16进制的24位字符串；`;
    }
};
//# sourceMappingURL=utils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appoint = exports.success = void 0;
const statusCode_1 = require("../config/statusCode");
// 成功的响应
exports.success = (data, res, msg) => {
    const temp = {
        code: statusCode_1.statusCode.SUCCESS.code,
        msg: msg || statusCode_1.statusCode.SUCCESS.msg,
        data
    };
    console.log(temp);
    res.json(temp);
};
// 回复指定内容
exports.appoint = (target, res, data = {}) => {
    const temp = {
        code: target.code,
        msg: target.msg,
        data
    };
    res.json(temp);
};
//# sourceMappingURL=resFunc.js.map
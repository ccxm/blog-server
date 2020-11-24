"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testWithRules = exports.decodeToken = exports.parseReqParam = void 0;
const config_1 = require("./../config/config");
const rules_1 = require("./rules");
const resFunc_1 = require("./resFunc");
const statusCode_1 = require("./../config/statusCode");
const jwt = require("jsonwebtoken");
// 解析请求参数，所有参数都在params里拿到
exports.parseReqParam = (req, res, next) => {
    if (req.url === '/user/upload-md') {
        next();
        return;
    }
    if (req.method === 'GET') {
        req.body = req.query;
    }
    req.body.userId = exports.decodeToken(req);
    console.log(req.method);
    console.log(req.path);
    if (req.method !== 'OPTIONS') {
        console.log(req.body);
        next();
    }
    else {
        res.end('');
    }
};
// 解析token
exports.decodeToken = (req) => {
    if (req.headers.authorization) {
        const temp = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
        return temp.userId;
    }
    return req.body.userId;
};
// 通过规则来检验参数，检验请求参数是否合法
exports.testWithRules = (req, res, next) => {
    const reqObj = req.body, testObj = _getTestObj(req);
    const result = _checkParamIsVaild(reqObj, testObj).result;
    // 如果校验结果为空，则说明该值合法
    if (!result) {
        next();
    }
    else {
        console.log(result);
        resFunc_1.appoint(statusCode_1.statusCode.EMPTY_PARAM, res, {
            detail: result
        });
    }
};
/**
 * 检验参数是否合法
 * @param reqObj 请求的对象
 * @param testObj 检验的对象
 */
const _checkParamIsVaild = (reqObj, testObj) => {
    let emptyResultStr = ''; // 空参数的结果
    let illegalResultStr = ''; // 不合法参数的结果
    for (let key in testObj) {
        // 1、optional：判断是否为可选参数，并且检验值是否为空；如果不为空，则进行下一步的判断
        if (testObj[key] === 'optional' && !reqObj[key]) {
            continue;
        }
        // 2、''：判断值是否为空；要注意该值不能为0和false
        if (!reqObj[key] && (typeof reqObj[key] !== 'number' && typeof reqObj[key] !== 'boolean')) {
            emptyResultStr += key + config_1.CONFIG.EMPTY_PARAM_TIP + '；';
            continue;
        }
        // 3、[{}]：递归检查对象数组；对象数组要在数组前面
        if (Object.prototype.toString.call(testObj[key]) === '[object Array]'
            && Object.prototype.toString.call(testObj[key][0]) === '[object Object]') {
            reqObj[key].forEach((item) => {
                const temp = _checkParamIsVaild(item, testObj[key][0]);
                emptyResultStr += temp.emptyResultStr;
                illegalResultStr += temp.illegalResultStr;
            });
            continue;
        }
        // 4、[]：遍历检查参数是否为数组中的值
        if (testObj[key] && reqObj[key] && Object.prototype.toString.call(testObj[key]) === '[object Array]') {
            illegalResultStr += _checkParamsIsInArray(reqObj[key], testObj[key], key);
            continue;
        }
        // 5、func()：判断参数是否符合自定义函数的值
        if (Object.prototype.toString.call(testObj[key]) === '[object Function]') {
            illegalResultStr += testObj[key](reqObj[key], key);
            continue;
        }
        // 6、{}： 递归判断对象的值
        if (Object.prototype.toString.call(testObj[key]) === '[object Object]') {
            const temp = _checkParamIsVaild(reqObj[key], testObj[key]);
            emptyResultStr += temp.emptyResultStr;
            illegalResultStr += temp.illegalResultStr;
        }
    }
    return {
        emptyResultStr,
        illegalResultStr,
        result: emptyResultStr + illegalResultStr
    };
};
// 检验参数的值是否存在于目标数组中
const _checkParamsIsInArray = (reqObj, testObj, key) => {
    let resultStr = ''; // 检验结果
    if (Object.prototype.toString.call(testObj) === '[object Array]') {
        if (!testObj.includes(reqObj)) {
            resultStr = `${key}=${reqObj}此值不合法；`;
        }
    }
    return resultStr;
};
// 从检验列表中获取检验的对象
const _getTestObj = (req) => {
    if (req.path in rules_1.rules) {
        return rules_1.rules[req.path];
    }
    // 如果没有该对象，则合成restful地址继续查找
    const lastIndex = req.path.lastIndexOf('/'); // 找出最后一个/的位置，以便插入谓语动词
    let path = req.path;
    path = path.substring(0, lastIndex + 1) + req.method.toLowerCase() + '-' + path.substring(lastIndex + 1);
    return rules_1.rules[path] || {};
};
//# sourceMappingURL=middleware.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInstance = exports.User = void 0;
const db_1 = require("./../public-modules/db");
const user_1 = require("./../models/user");
const statusCode_1 = require("./../config/statusCode");
const config_1 = require("./../config/config");
const utils_1 = require("./../utils/utils");
const constant_1 = require("./../config/constant");
const folder_1 = require("./folder");
const gather_1 = require("./gather");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const fs = require("fs");
const file_1 = require("./file");
class User extends db_1.DB {
    constructor() {
        super('users', user_1.userModl);
        this.login = (req, res, next) => {
            this.findOne(res, next, {
                query: { email: req.body.email, password: md5(req.body.password) },
                condition: {
                    userId: true, email: true, userInfo: true, _id: false
                },
                errCode: statusCode_1.statusCode.LOGIN_FAIL
            }).then((data) => {
                console.log(data);
                if (data.doc) {
                    this.success(Object.assign(Object.assign({}, JSON.parse(JSON.stringify(data.doc))), { token: 'Bearer ' + this.createToken(data.doc.userId) }), res, '登录成功');
                }
            });
        };
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const isEmailExist = yield this.findTheFieldIsExit('email', req.body.email, next);
            if (isEmailExist) {
                this.appoint(statusCode_1.statusCode.EMAIL_BEEN_USED, res);
                return;
            }
            const userId = utils_1.createUuid();
            const temp = {
                userId,
                email: req.body.email,
                nickName: req.body.email,
                password: md5(req.body.password),
                userInfo: {
                    nickName: req.body.email,
                    avatarUrl: config_1.CONFIG.DEFAULT_IMAGES_PATH + constant_1.defaultImageList[Math.floor(Math.random() * 10)] + '.png',
                    tempUrl: ''
                }
            };
            this.create(res, next, {
                query: Object.assign({}, temp)
            }).then(() => __awaiter(this, void 0, void 0, function* () {
                req.body.folderName = 'NewFolder';
                req.body.userId = userId;
                if (!(yield folder_1.folderInstance.newFolder(req, res, next, false, false))) {
                    return;
                }
                const initGatherRes = yield gather_1.gatherInstance.createGather(userId, res, next);
                if (initGatherRes.isError) {
                    return;
                }
                this.success({ userId }, res, '注册成功');
            }));
        });
        this.uploadMd = (req, res, next) => {
            console.log(req.body);
            fs.writeFileSync('./test.md', req.body.md);
        };
        this.getMd = (req, res, next) => {
            res.end(fs.readFileSync('./test.md'));
        };
        this.updatePageView = (req, res, next) => {
            this.findOneAndUpdate(res, next, {
                query: {
                    userId: req.body.userId
                },
                condition: {
                    $inc: { pageView: 1 }
                },
                options: {
                    new: true,
                    fields: {
                        _id: false,
                        pageView: true
                    }
                },
                errCode: statusCode_1.statusCode.update_visitor_page_view_err
            }).then((doc) => {
                if (!doc.isError) {
                    this.success(doc.doc, res, '更新访客浏览量成功');
                }
            });
        };
        this.getPageView = (req, res, next) => {
            this.findOne(res, next, {
                query: {
                    userId: req.body.userId
                },
                condition: {
                    _id: false,
                    pageView: true
                },
                errCode: statusCode_1.statusCode.get_visitor_page_view_err
            }).then((doc) => {
                if (!doc.isError) {
                    this.success(doc.doc, res, '获取访客浏览量成功');
                }
            });
        };
        // 获取统计数据
        this.getStatistics = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            const articleRes = yield file_1.fileInstance.countFiles(userId, res, next);
            const sortRes = yield folder_1.folderInstance.countFolders(userId, res, next);
            const tagRes = yield gather_1.gatherInstance.countTags(userId, res, next);
            if (articleRes.isError || sortRes.isError || tagRes.isError) {
                return;
            }
            const temp = {
                articleNum: articleRes.doc.count,
                sortNum: sortRes.doc.count,
                tagNum: tagRes.doc.count
            };
            this.success(temp, res, '获取统计数据成功');
        });
    }
    static getInstance() {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }
    // 查找某个字段是否存在
    findTheFieldIsExit(field, value, next) {
        return new Promise(resolve => {
            this.model.findOne({ [field]: value }, { [field]: true, _id: false }).then((res) => {
                // 不存在或者是字段相等都可以使用
                if (!res || res[field] === value) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            }).catch(err => {
                this.handleReject(err, resolve, next);
            });
        });
    }
    createToken(userId) {
        return jwt.sign({
            userId
        }, config_1.CONFIG.JWT_SERCRET, {
            expiresIn: config_1.CONFIG.JWT_EXPIRES_TIME
        });
    }
}
exports.User = User;
exports.userInstance = User.getInstance();
//# sourceMappingURL=user.js.map
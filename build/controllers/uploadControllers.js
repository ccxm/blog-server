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
exports.uploadImage = exports.imageUploader = void 0;
const path = require("path");
const multer = require("multer");
const UUID = require("uuid");
const config_1 = require("../config/config");
const resFunc_1 = require("../public-modules/resFunc");
const middleware_1 = require("../public-modules/middleware");
//设置保存规则
const storage = multer.diskStorage({
    //destination：字段设置上传路径，可以为函数
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = {
                type: req.headers.img_type,
                userId: middleware_1.decodeToken(req)
            };
            req.body = formData;
            console.log(req.body);
            const targetPath = req.body.type === 'article' ? config_1.CONFIG.ARTICLE_IMAGES_PATH : config_1.CONFIG.ARTICLE_BG_IMAGES_PATH;
            const filePath = path.resolve(__dirname, config_1.CONFIG.STATIC_IMAGES_PATH + targetPath + req.body.userId + '/');
            cb(null, filePath);
        });
    },
    //filename：设置文件保存的文件名
    filename: function (req, file, cb) {
        const extName = file.originalname.slice(file.originalname.lastIndexOf('.'));
        const fileName = UUID.v1();
        cb(null, fileName + extName);
    }
});
//设置过滤规则（可选）
const imageFilter = (req, file, cb) => {
    const acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    //微信公众号只接收上述四种类型的图片
    if (acceptableMime.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const imageLimit = {
    fieldSize: 5000
};
//创建 multer 实例
exports.imageUploader = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: imageLimit
}).array('file', 1); //定义表单字段、数量限制
exports.uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    const targetPath = req.body.type === 'article' ? config_1.CONFIG.ARTICLE_IMAGES_PATH : config_1.CONFIG.ARTICLE_BG_IMAGES_PATH;
    resFunc_1.success({
        url: `${targetPath}${req.body.userId}/${req.files[0].filename}`
    }, res, '上传照片成功');
});
//# sourceMappingURL=uploadControllers.js.map
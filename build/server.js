"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const middleware_1 = require("./public-modules/middleware");
const config_1 = require("./config/config");
const statusCode_1 = require("./config/statusCode");
const userRouter_1 = require("./routers/userRouter");
const folderRouter_1 = require("./routers/folderRouter");
const fileRouter_1 = require("./routers/fileRouter");
const trashRouter_1 = require("./routers/trashRouter");
const gatherRouter_1 = require("./routers/gatherRouter");
const expressJwt = require("express-jwt");
const resFunc = require("./public-modules/resFunc");
require("./controllers/folder");
require("./config/connectDB");
const uploadControllers_1 = require("./controllers/uploadControllers");
const app = express();
app.set('trust proxy', true);
app.listen(config_1.CONFIG.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.use(expressJwt({
    secret: config_1.CONFIG.JWT_SERCRET
}).unless({
    path: [
        '/user/*',
        '/user/upload-md',
        '/user/md',
        /^\/user/,
        '/file/page-view',
        '/file/detail',
        '/file/last-articles',
        '/file/articles',
        '/folder/folder-list',
        '/gather/tag-list',
        '/user/statistics',
        '/user/page-view'
    ]
}));
// 自定义中间件
app.use(middleware_1.parseReqParam);
app.use(middleware_1.testWithRules);
app.use('/user/upload-image', uploadControllers_1.imageUploader);
// 路由
new userRouter_1.UserRouter(app);
new folderRouter_1.FolderRouter(app);
new fileRouter_1.FileRouter(app);
new trashRouter_1.TrashRouter(app);
new gatherRouter_1.GatherRouter(app);
app.get('/', (req, res) => {
    res.end('helloworld');
});
app.use((err, req, res, next) => {
    console.log('监听到出错');
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        resFunc.appoint(statusCode_1.statusCode.UNAUTHORIZED, res);
        return;
    }
    if (process.env.NODE_ENV === 'development') {
        resFunc.appoint(statusCode_1.statusCode.FAIL, res, err);
    }
    else if (process.env.NODE_ENV === 'product') {
        // 生产环境下不打印堆栈信息
        resFunc.appoint(statusCode_1.statusCode.UNKNOW, res, err);
    }
});
//# sourceMappingURL=server.js.map
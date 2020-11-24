import * as express from 'express'
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from 'express'
import { parseReqParam, testWithRules } from './public-modules/middleware'
import { CONFIG } from './config/config'
import { statusCode } from './config/statusCode'
import { UserRouter } from './routers/userRouter'
import { FolderRouter } from './routers/folderRouter'
import { FileRouter } from './routers/fileRouter'
import { TrashRouter } from './routers/trashRouter'
import { GatherRouter } from './routers/gatherRouter'
import * as expressJwt from 'express-jwt'
import * as resFunc from './public-modules/resFunc'
import './controllers/folder'
import './config/connectDB'
import { imageUploader } from "./controllers/uploadControllers"

const app = express()
app.set('trust proxy', true);

app.listen(CONFIG.PORT)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//设置允许跨域访问该服务.
app.all('*', function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*')
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.use(expressJwt({
    secret: CONFIG.JWT_SERCRET
}).unless({
    path: [
        '/file/page-view',
        '/file/detail',
        '/file/last-articles',
        '/file/articles',
        '/folder/folder-list',
        '/gather/tag-list',
        '/user/statistics',
        '/user/page-view',
        '/user/login',
        '/user/register',
    ]
}))

// 自定义中间件
app.use(parseReqParam)
app.use(testWithRules)

app.use('/user/upload-image', imageUploader)

// 路由
new UserRouter(app)
new FolderRouter(app)
new FileRouter(app)
new TrashRouter(app)
new GatherRouter(app)

app.get('/', (req: Request, res: Response) => {
    res.end('helloworld')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('监听到出错')
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        res.status(401)
        resFunc.appoint(statusCode.UNAUTHORIZED, res)
        return
    }
    if (process.env.NODE_ENV === 'development') {
        resFunc.appoint(statusCode.FAIL, res, err)
    } else if (process.env.NODE_ENV === 'product') {
        // 生产环境下不打印堆栈信息
        resFunc.appoint(statusCode.UNKNOW, res, err)
    }
})

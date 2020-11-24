import { Request, Response, NextFunction } from 'express'
import * as path from 'path'
import * as multer from 'multer'
import * as UUID from 'uuid'
import { CONFIG } from '../config/config'
import { success } from '../public-modules/resFunc'
import {decodeToken} from "../public-modules/middleware"

//设置保存规则
const storage = multer.diskStorage({
    //destination：字段设置上传路径，可以为函数
    destination: async function (req, file, cb) {
        const formData = {
            type: req.headers.img_type,
            userId: decodeToken(req)
        }
        req.body = formData
        console.log(req.body)
        const targetPath = req.body.type === 'article' ? CONFIG.ARTICLE_IMAGES_PATH : CONFIG.ARTICLE_BG_IMAGES_PATH
        const filePath = path.resolve(__dirname, CONFIG.STATIC_IMAGES_PATH + targetPath + req.body.userId + '/')
        cb(null, filePath)
    },

    //filename：设置文件保存的文件名
    filename: function (req, file, cb) {
        const extName: string = file.originalname.slice(file.originalname.lastIndexOf('.'))
        const fileName: string = UUID.v1()
        cb(null, fileName + extName)
    }
})

//设置过滤规则（可选）
const imageFilter = (req: Request, file: any, cb: any) => {
    const acceptableMime: Array<string> = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    //微信公众号只接收上述四种类型的图片
    if (acceptableMime.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const imageLimit = {
    fieldSize: 5000
}

//创建 multer 实例
export const imageUploader = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: imageLimit
}).array('file', 1)    //定义表单字段、数量限制

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files)
    const targetPath = req.body.type === 'article' ? CONFIG.ARTICLE_IMAGES_PATH : CONFIG.ARTICLE_BG_IMAGES_PATH
    success({
        url: `${targetPath}${req.body.userId}/${req.files[0].filename}`
    }, res, '上传照片成功')
}

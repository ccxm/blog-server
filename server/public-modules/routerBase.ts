import {Router} from 'express'

export abstract class RouterBase {
    public router:Router
    public controller: any
    constructor(app: any, path:string,controller:any) {
        this.router = Router()
        this.controller = controller
        this.addRouter()
        this.useRouter(app, path)
    }

    // 添加路由
    abstract addRouter():void

    // 使用路由
    useRouter(app: any,path:string):void {
        app.use(path, this.router)
    }
}
import { RouterBase } from '../public-modules/routerBase'
import { User, userInstance } from '../controllers/user'
import { uploadImage } from '../controllers/uploadControllers'

export class UserRouter extends RouterBase {
    public controller: User
    constructor(app: any) {
        super(app, '/user', userInstance)
    }

    addRouter(): void {
        this.router.post('/login', this.controller.login)
        this.router.post('/register', this.controller.register)
        // this.router.post('/upload-md', this.controller.uploadMd)
        // this.router.get('/md', this.controller.getMd)
        this.router.post('/upload-image', uploadImage)
        this.router.get('/statistics', this.controller.getStatistics)
        this.router.put('/page-view', this.controller.updatePageView)
        this.router.get('/page-view', this.controller.getPageView)
    }
}

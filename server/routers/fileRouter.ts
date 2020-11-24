import { RouterBase } from '../public-modules/routerBase'
import { File, fileInstance } from '../controllers/file'

export class FileRouter extends RouterBase {
    public controller: File
    constructor(app: any) {
        super(app, '/file', fileInstance)
    }

    addRouter(): void {
        this.router.post('/new-file', fileInstance.newFile)
        this.router.put('/file', fileInstance.updateFile)
        this.router.post('/rename', fileInstance.renameFile)
        this.router.delete('/file', fileInstance.deleteFile)
        this.router.post('/copy', this.controller.copyFile)
        this.router.post('/cut', this.controller.cutFile)
        this.router.get('/last-articles', this.controller.getLastFileList)
        this.router.get('/articles', this.controller.getFileList)
        this.router.put('/page-view', this.controller.updatePageView)
        this.router.get('/detail', this.controller.getFileDetail)
        this.router.post('/article-image', this.controller.updateFileImage)
    }
}

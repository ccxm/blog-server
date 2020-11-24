import { RouterBase } from '../public-modules/routerBase'
import { Trash, trashInstance } from '../controllers/trash'

export class TrashRouter extends RouterBase {
    public controller: Trash
    constructor(app: any) {
        super(app, '/trash', trashInstance)
    }

    addRouter(): void {
        this.router.post('/restore-folder', this.controller.restoreFolder)
        this.router.post('/restore-file', this.controller.restoreFile)
        this.router.delete('/folder', this.controller.deleteFolder)
        this.router.delete('/file', this.controller.deleteFile)
        this.router.post('/clear', this.controller.clear)
    }
}
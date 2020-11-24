import { RouterBase } from '../public-modules/routerBase'
import { Folder, folderInstance } from '../controllers/folder'

export class FolderRouter extends RouterBase {
    public controller: Folder
    constructor(app: any) {
        super(app, '/folder', folderInstance)
    }

    addRouter(): void {
        this.router.post('/new-folder', this.controller.newFolder)
        this.router.get('/folder-list', this.controller.getFolderList)
        this.router.put('/rename', this.controller.renameFolder)
        this.router.delete('/folder', this.controller.delFolder)
        this.router.post('/copy', this.controller.copyFolder)
        this.router.post('/cut', this.controller.cutFolder)
    }
}
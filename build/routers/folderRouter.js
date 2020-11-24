"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRouter = void 0;
const routerBase_1 = require("../public-modules/routerBase");
const folder_1 = require("../controllers/folder");
class FolderRouter extends routerBase_1.RouterBase {
    constructor(app) {
        super(app, '/folder', folder_1.folderInstance);
    }
    addRouter() {
        this.router.post('/new-folder', this.controller.newFolder);
        this.router.get('/folder-list', this.controller.getFolderList);
        this.router.put('/rename', this.controller.renameFolder);
        this.router.delete('/folder', this.controller.delFolder);
        this.router.post('/copy', this.controller.copyFolder);
        this.router.post('/cut', this.controller.cutFolder);
    }
}
exports.FolderRouter = FolderRouter;
//# sourceMappingURL=folderRouter.js.map
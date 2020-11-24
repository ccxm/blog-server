"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const routerBase_1 = require("../public-modules/routerBase");
const file_1 = require("../controllers/file");
class FileRouter extends routerBase_1.RouterBase {
    constructor(app) {
        super(app, '/file', file_1.fileInstance);
    }
    addRouter() {
        this.router.post('/new-file', file_1.fileInstance.newFile);
        this.router.put('/file', file_1.fileInstance.updateFile);
        this.router.post('/rename', file_1.fileInstance.renameFile);
        this.router.delete('/file', file_1.fileInstance.deleteFile);
        this.router.post('/copy', this.controller.copyFile);
        this.router.post('/cut', this.controller.cutFile);
        this.router.get('/last-articles', this.controller.getLastFileList);
        this.router.get('/articles', this.controller.getFileList);
        this.router.put('/page-view', this.controller.updatePageView);
        this.router.get('/detail', this.controller.getFileDetail);
        this.router.post('/article-image', this.controller.updateFileImage);
    }
}
exports.FileRouter = FileRouter;
//# sourceMappingURL=fileRouter.js.map
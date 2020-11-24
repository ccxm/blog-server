"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashRouter = void 0;
const routerBase_1 = require("../public-modules/routerBase");
const trash_1 = require("../controllers/trash");
class TrashRouter extends routerBase_1.RouterBase {
    constructor(app) {
        super(app, '/trash', trash_1.trashInstance);
    }
    addRouter() {
        this.router.post('/restore-folder', this.controller.restoreFolder);
        this.router.post('/restore-file', this.controller.restoreFile);
        this.router.delete('/folder', this.controller.deleteFolder);
        this.router.delete('/file', this.controller.deleteFile);
        this.router.post('/clear', this.controller.clear);
    }
}
exports.TrashRouter = TrashRouter;
//# sourceMappingURL=trashRouter.js.map
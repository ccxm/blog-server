"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const routerBase_1 = require("../public-modules/routerBase");
const user_1 = require("../controllers/user");
const uploadControllers_1 = require("../controllers/uploadControllers");
class UserRouter extends routerBase_1.RouterBase {
    constructor(app) {
        super(app, '/user', user_1.userInstance);
    }
    addRouter() {
        this.router.post('/login', this.controller.login);
        this.router.post('/register', this.controller.register);
        this.router.post('/upload-md', this.controller.uploadMd);
        this.router.get('/md', this.controller.getMd);
        this.router.post('/upload-image', uploadControllers_1.uploadImage);
        this.router.get('/statistics', this.controller.getStatistics);
        this.router.put('/page-view', this.controller.updatePageView);
        this.router.get('/page-view', this.controller.getPageView);
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=userRouter.js.map
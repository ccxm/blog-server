"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatherRouter = void 0;
const routerBase_1 = require("../public-modules/routerBase");
const gather_1 = require("../controllers/gather");
class GatherRouter extends routerBase_1.RouterBase {
    constructor(app) {
        super(app, '/gather', gather_1.gatherInstance);
    }
    addRouter() {
        this.router.get('/tag-list', gather_1.gatherInstance.getTagList);
        this.router.post('/tag', gather_1.gatherInstance.addTag);
    }
}
exports.GatherRouter = GatherRouter;
//# sourceMappingURL=gatherRouter.js.map
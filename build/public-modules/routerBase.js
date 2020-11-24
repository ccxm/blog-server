"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterBase = void 0;
const express_1 = require("express");
class RouterBase {
    constructor(app, path, controller) {
        this.router = express_1.Router();
        this.controller = controller;
        this.addRouter();
        this.useRouter(app, path);
    }
    // 使用路由
    useRouter(app, path) {
        app.use(path, this.router);
    }
}
exports.RouterBase = RouterBase;
//# sourceMappingURL=routerBase.js.map
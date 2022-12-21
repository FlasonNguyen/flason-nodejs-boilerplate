"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRoute = void 0;
const express_1 = require("express");
const _controllers_1 = require("@controllers");
class IndexRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.indexController = new _controllers_1.IndexController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.route.js.map
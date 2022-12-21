"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
class IndexController {
    constructor() {
        this.index = (req, res, next) => {
            try {
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.IndexController = IndexController;
//# sourceMappingURL=index.controller.js.map
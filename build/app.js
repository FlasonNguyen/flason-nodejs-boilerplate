"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hpp_1 = require("hpp");
const helmet_1 = require("helmet");
const morgan_1 = require("morgan");
const cors_1 = require("cors");
const swagger_jsdoc_1 = require("swagger-jsdoc");
const swagger_ui_express_1 = require("swagger-ui-express");
const cookie_parser_1 = require("cookie-parser");
const _utils_1 = require("@utils");
const _middlewares_1 = require("@middlewares");
const _models_1 = require("@models");
const _config_1 = require("@config");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = _config_1.default.NODE_ENV || 'development';
        this.port = _config_1.default.SERVER.PORT || 8080;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    connectToDatabase() {
        _models_1.Database.sequelize.sync({ force: false });
    }
    listen() {
        this.app.listen(this.port, () => {
            _utils_1.logger.info(`=================================`);
            _utils_1.logger.info(`======= ENV: ${this.env} =======`);
            _utils_1.logger.info(`🚀 App listening on the port ${this.port}`);
            _utils_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(_config_1.default.LOG_FORMAT, { stream: _utils_1.stream }));
        this.app.use((0, cors_1.default)({ origin: _config_1.default.ORIGIN, credentials: _config_1.default.CREDENTIALS }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    initializeSwagger() {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Express API for Boilerplate',
                    version: '1.0.0',
                    description: 'Express Boilerplate API Docs',
                },
            },
            apis: ['swagger.yaml'],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(_middlewares_1.errorMiddleware);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
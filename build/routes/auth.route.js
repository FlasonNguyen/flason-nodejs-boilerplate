"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const _controllers_1 = require("@controllers");
const dtos_1 = require("@/models/dtos");
const _middlewares_1 = require("@middlewares");
const _middlewares_2 = require("@middlewares");
class AuthRoute {
    constructor() {
        this.path = '/auth/';
        this.router = (0, express_1.Router)();
        this.authController = new _controllers_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/auth/signup`, this.authController.signUp);
        this.router.post(`${this.path}login`, (0, _middlewares_2.validationMiddleware)(dtos_1.UserDto, 'body'), this.authController.logIn);
        this.router.post(`${this.path}logout`, _middlewares_1.authMiddleware, this.authController.logOut);
    }
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=auth.route.js.map
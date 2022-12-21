"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoute = void 0;
const express_1 = require("express");
const _controllers_1 = require("@controllers");
const dtos_1 = require("@/models/dtos");
const _middlewares_1 = require("@middlewares");
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new _controllers_1.UsersController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
        this.router.post(`${this.path}`, (0, _middlewares_1.validationMiddleware)(dtos_1.UserDto, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id`, (0, _middlewares_1.validationMiddleware)(dtos_1.UserDto, 'body', true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
    }
}
exports.UsersRoute = UsersRoute;
//# sourceMappingURL=users.route.js.map
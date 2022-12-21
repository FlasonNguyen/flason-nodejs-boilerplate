"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const sequelize_1 = require("sequelize");
const supertest_1 = require("supertest");
const app_1 = require("@/app");
const _routes_1 = require("@routes");
const uuid_1 = require("uuid");
const examId1 = (0, uuid_1.v4)();
const examId2 = (0, uuid_1.v4)();
const examId3 = (0, uuid_1.v4)();
console.log(examId1);
console.log(examId2);
console.log(examId3);
console.log(examId1);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(() => resolve(), 500));
}));
describe('Testing Users', () => {
    describe('[GET] /users', () => {
        it('response findAll users', () => __awaiter(void 0, void 0, void 0, function* () {
            const usersRoute = new _routes_1.UsersRoute();
            const users = usersRoute.usersController.userService.users;
            users.findAll = jest.fn().mockReturnValue([
                {
                    id: examId1,
                    email: 'a@email.com',
                    password: yield bcrypt_1.default.hash('q1w2e3r4!', 10),
                },
                {
                    id: examId2,
                    email: 'b@email.com',
                    password: yield bcrypt_1.default.hash('a1s2d3f4!', 10),
                },
                {
                    id: examId3,
                    email: 'c@email.com',
                    password: yield bcrypt_1.default.hash('z1x2c3v4!', 10),
                },
            ]);
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).get(`${usersRoute.path}`).expect(200);
        }));
    });
    describe('[GET] /users/:id', () => {
        it('response findOne user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = examId1;
            const usersRoute = new _routes_1.UsersRoute();
            const users = usersRoute.usersController.userService.users;
            users.findByPk = jest.fn().mockReturnValue({
                id: examId1,
                email: 'a@email.com',
                password: yield bcrypt_1.default.hash('q1w2e3r4!', 10),
            });
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
        }));
    });
    describe('[POST] /users', () => {
        it('response Create user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
            };
            const usersRoute = new _routes_1.UsersRoute();
            const users = usersRoute.usersController.userService.users;
            users.findOne = jest.fn().mockReturnValue(null);
            users.create = jest.fn().mockReturnValue({
                id: examId1,
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
        }));
    });
    describe('[PUT] /users/:id', () => {
        it('response Update user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = examId1;
            const userData = {
                email: 'test@email.com',
                password: '1q2w3e4r!',
            };
            const usersRoute = new _routes_1.UsersRoute();
            const users = usersRoute.usersController.userService.users;
            users.findByPk = jest.fn().mockReturnValue({
                id: userId,
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            users.update = jest.fn().mockReturnValue([1]);
            users.findByPk = jest.fn().mockReturnValue({
                id: userId,
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
        }));
    });
    describe('[DELETE] /users/:id', () => {
        it('response Delete user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = examId1;
            const usersRoute = new _routes_1.UsersRoute();
            const users = usersRoute.usersController.userService.users;
            users.findByPk = jest.fn().mockReturnValue({
                id: userId,
                email: 'a@email.com',
                password: yield bcrypt_1.default.hash('q1w2e3r4!', 10),
            });
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([usersRoute]);
            return (0, supertest_1.default)(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
        }));
    });
});
//# sourceMappingURL=users.test.js.map
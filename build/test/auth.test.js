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
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(() => resolve(), 500));
}));
describe('Testing Auth', () => {
    describe('[POST] /signup', () => {
        it('response should have the Create userData', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
            };
            const authRoute = new _routes_1.AuthRoute();
            const users = authRoute.authController.authService.model;
            users.findOne = jest.fn().mockReturnValue(null);
            users.create = jest.fn().mockReturnValue({
                id: examId1,
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([authRoute]);
            return (0, supertest_1.default)(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
        }));
    });
    describe('[POST] /login', () => {
        it('response should have the Set-Cookie header with the Authorization token', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
            };
            const authRoute = new _routes_1.AuthRoute();
            const users = authRoute.authController.authService.model;
            users.findOne = jest.fn().mockReturnValue({
                id: examId1,
                email: userData.email,
                password: yield bcrypt_1.default.hash(userData.password, 10),
            });
            sequelize_1.Sequelize.authenticate = jest.fn();
            const app = new app_1.default([authRoute]);
            return (0, supertest_1.default)(app.getServer())
                .post(`${authRoute.path}login`)
                .send(userData)
                .expect('Set-Cookie', /^Authorization=.+/);
        }));
    });
    // describe('[POST] /logout', () => {
    //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
    //     const authRoute = new AuthRoute();
    //
    //     const app = new App([authRoute]);
    //     return request(app.getServer())
    //       .post(`${authRoute.path}logout`)
    //       .expect('Set-Cookie', /^Authorization=\;/);
    //   });
    // });
});
//# sourceMappingURL=auth.test.js.map
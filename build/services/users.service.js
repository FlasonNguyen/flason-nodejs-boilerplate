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
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const _models_1 = require("@models");
const _exceptions_1 = require("@exceptions");
const _utils_1 = require("@utils");
class UserService {
    constructor() {
        this.users = _models_1.UserModel;
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUser = yield this.users.findAll();
            return allUser;
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userId))
                throw new _exceptions_1.HttpException(400, 'UserId is empty');
            const findUser = yield this.users.findByPk(userId);
            if (!findUser)
                throw new _exceptions_1.HttpException(409, "UsersInterface doesn't exist");
            return findUser;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userData))
                throw new _exceptions_1.HttpException(400, 'userData is empty');
            const findUser = yield this.users.findOne({ where: { email: userData.email } });
            if (findUser)
                throw new _exceptions_1.HttpException(409, `This email ${userData.email} already exists`);
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            const createUserData = yield this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return createUserData;
        });
    }
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userData))
                throw new _exceptions_1.HttpException(400, 'userData is empty');
            const findUser = yield this.users.findByPk(userId);
            if (!findUser)
                throw new _exceptions_1.HttpException(409, "UsersInterface doesn't exist");
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            yield this.users.update(Object.assign(Object.assign({}, userData), { password: hashedPassword }), { where: { id: userId } });
            const updateUser = yield this.users.findByPk(userId);
            return updateUser;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userId))
                throw new _exceptions_1.HttpException(400, "UsersInterface doesn't existId");
            const findUser = yield this.users.findByPk(userId);
            if (!findUser)
                throw new _exceptions_1.HttpException(409, "UsersInterface doesn't exist");
            yield this.users.destroy({ where: { id: userId } });
            return findUser;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map
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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _config_1 = require("@config");
const _models_1 = require("@models");
const _exceptions_1 = require("@exceptions");
const _utils_1 = require("@utils");
class AuthService {
    constructor() {
        this.model = _models_1.UserModel;
    }
    // public model = UserModel;
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userData))
                throw new _exceptions_1.HttpException(400, 'userData is empty');
            const findUser = yield this.model.findOne({ where: { email: userData.email } });
            if (findUser)
                throw new _exceptions_1.HttpException(409, `This email ${userData.email} already exists`);
            const hashedPassword = yield bcrypt.hash(userData.password, 10);
            return yield this.model.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userData))
                throw new _exceptions_1.HttpException(400, 'userData is empty');
            const findUser = yield this.model.findOne({ where: { email: userData.email } });
            if (!findUser)
                throw new _exceptions_1.HttpException(409, `This email ${userData.email} was not found`);
            const isPasswordMatching = yield bcrypt.compare(userData.password, findUser.password);
            if (!isPasswordMatching)
                throw new _exceptions_1.HttpException(409, 'Password not matching');
            const tokenData = this.createToken(findUser);
            const cookie = this.createCookie(tokenData);
            return { cookie, findUser };
        });
    }
    logout(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, _utils_1.isEmpty)(userData))
                throw new _exceptions_1.HttpException(400, 'userData is empty');
            const findUser = yield this.model.findOne({ where: { email: userData.email, password: userData.password } });
            if (!findUser)
                throw new _exceptions_1.HttpException(409, "User doesn't exist");
            return findUser;
        });
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id, role: user.role };
        const secretKey = _config_1.default.SECRET_KEY;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
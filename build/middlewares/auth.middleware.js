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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
const _models_1 = require("@models");
const _exceptions_1 = require("@exceptions");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = _config_1.default.SECRET_KEY;
            const verificationResponse = (0, jsonwebtoken_1.verify)(Authorization, secretKey);
            const userId = verificationResponse.id;
            const findUser = yield _models_1.UserModel.findByPk(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new _exceptions_1.HttpException(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new _exceptions_1.HttpException(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new _exceptions_1.HttpException(401, 'Wrong authentication token'));
    }
});
exports.authMiddleware = authMiddleware;
// export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map
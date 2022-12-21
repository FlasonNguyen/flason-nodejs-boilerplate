"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const _models_1 = require("@models");
const sequelize = _models_1.Database.sequelize;
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'tbl_user',
    sequelize,
    // hooks: {
    //   beforeCreate: (item: any) => {
    //     const date = new Date();
    //     item.created_at_unix_timestamp = date.valueOf();
    //     item.updated_at_unix_timestamp = date.valueOf();
    //   },
    //   beforeUpdate: (item: any) => {
    //     item.updated_at_unix_timestamp = new Date().valueOf();
    //   },
    // },
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
        // exclude password
        attributes: { exclude: ['password', 'deleted_at'] },
    },
    // scopes: {
    //   deleted: {
    //     // tslint:disable-next-line:no-null-keyword
    //     where: { deleted_at: { $ne: null } },
    //     paranoid: false,
    //   },
    //   withPassword: {
    //     attributes: { include: ["password"] },
    //   },
    // },
});
//# sourceMappingURL=user.model.js.map
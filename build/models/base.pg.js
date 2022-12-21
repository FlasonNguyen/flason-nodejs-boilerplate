"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("@config");
// import { logger } from '@utils';
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = _config_1.default.DATABASE;
exports.sequelize = new sequelize_1.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    dialect: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: true,
    },
    pool: {
        max: 20,
        min: 0,
        idle: 200000,
        acquire: 100000,
    },
    timezone: '+07:00',
    dialectOptions: {
    // ssl: {
    //   require: false,
    //   rejectUnauthorized: false,
    // },
    },
    // logQueryParameters: config.NODE_ENV === 'development',
    // logging: (query, time) => {
    //   logger.info(time + 'ms' + ' ' + query);
    // },
    logging: false,
    benchmark: true,
});
// sequelize.authenticate();
exports.Database = {
    sequelize: exports.sequelize,
    Sequelize: // connection instance (RAW queries)
    sequelize_1.Sequelize, // library
};
//# sourceMappingURL=base.pg.js.map
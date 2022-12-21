"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// export const CREDENTIALS = process.env.CREDENTIALS === 'true';
exports.default = {
    CREDENTIALS: process.env.CREDENTIALS === 'true',
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY,
    LOG_FORMAT: process.env.LOG_FORMAT,
    LOG_DIR: process.env.LOG_DIR,
    ORIGIN: process.env.ORIGIN,
    SERVER: {
        PORT: process.env.PORT,
    },
    DATABASE: {
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
    },
};
//# sourceMappingURL=index.js.map
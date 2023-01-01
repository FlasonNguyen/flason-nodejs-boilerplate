import {config} from "dotenv";

require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD+'',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: 'postgresql',
    // "ssl": true,
    // "dialectOptions": {
    //   "ssl": {
    //     "require": true
    //   }
    // }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD+'',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: 'postgresql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD+'',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: 'postgresql',
    // Setup For GCLOUD
    // "dialectOptions": {
    //   "socketPath": `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    // },
    // "ssl":true,
    // "dialectOptions":{
    //    "ssl":{
    //       "require":true
    //    }
    // }
  },
};

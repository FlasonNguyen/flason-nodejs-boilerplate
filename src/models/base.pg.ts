import { Sequelize } from 'sequelize';
import config from '@config';
// import { logger } from '@utils';

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = config.DATABASE;

export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
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

export const Database = {
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

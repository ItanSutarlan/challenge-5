/* eslint-disable quotes, quote-props */
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PORT, DB_PASS, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    dialect: 'postgres',
  },
};

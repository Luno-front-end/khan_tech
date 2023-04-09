const mysql = require("mysql2");
const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 20000,
    },
    connectionTimeout: 3000000,
  }
);

module.exports = { sequelize };

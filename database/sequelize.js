const { Sequelize } = require("sequelize");
const { DB } = require("../config/constants");

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;

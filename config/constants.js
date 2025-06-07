require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: process.env.PORT || 3000,

  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    NAME: process.env.DB_NAME,
  },

  PRECISION: 4, // For limiting decimal precision of amounts

  DEFAULT_TRANSACTION_DESCRIPTION: "Transaction",
};

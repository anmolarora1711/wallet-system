const { body, param, query } = require("express-validator");

const setupWalletValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),

  body("balance")
    .isDecimal({ decimal_digits: "0,4" })
    .withMessage("Balance must be a decimal number with up to 4 decimals")
    .custom((value) => {
      if (parseFloat(value) <= 0) {
        throw new Error("Balance must be a positive number");
      }
      return true;
    }),
];

module.exports = {
  setupWalletValidator,
};

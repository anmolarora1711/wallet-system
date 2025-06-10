const { body, param, query } = require("express-validator");

const setupWalletValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),

  body("balance")
    .optional()
    .isDecimal({ decimal_digits: "0,4" })
    .withMessage("Balance must be a decimal number with up to 4 decimals")
    .custom((value) => {
      if (parseFloat(value) < 0) {
        throw new Error("Balance must be a non-negative number");
      }
      return true;
    }),
];

const processTransactionValidator = [
  param("walletId").isUUID().withMessage("Wallet ID must be a valid UUID"),

  body("amount")
    .isDecimal({ decimal_digits: "0,4" })
    .withMessage("Amount must be a decimal number with up to 4 precision"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

const getTransactionsValidator = [
  query("walletId").isUUID().withMessage("Wallet ID must be a valid UUID"),

  query("skip")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Skip must be a non-negative integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

const getWalletValidator = [
  param("id").isUUID().withMessage("Wallet ID must be a valid UUID"),
];

module.exports = {
  setupWalletValidator,
  processTransactionValidator,
  getTransactionsValidator,
  getWalletValidator,
};

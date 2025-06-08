const express = require("express");
const walletController = require("../controllers/wallet.controller");
const transactionController = require("../controllers/transaction.controller");
const validate = require("../middlewares/validateRequest");
const {
  setupWalletValidator,
  getWalletValidator,
  processTransactionValidator,
  getTransactionsValidator,
} = require("../validators/wallet.validator");

const router = express.Router();

router.post(
  "/setup",
  setupWalletValidator,
  validate,
  walletController.setupWallet
);
router.get(
  "/wallet/:id",
  getWalletValidator,
  validate,
  walletController.getWalletDetails
);
router.post(
  "/transact/:walletId",
  processTransactionValidator,
  validate,
  transactionController.processTransaction
);
router.get(
  "/transactions",
  getTransactionsValidator,
  validate,
  transactionController.getTransactions
);

module.exports = router;

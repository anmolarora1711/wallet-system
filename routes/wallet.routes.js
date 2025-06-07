const express = require("express");
const walletController = require("../controllers/wallet.controller");
const transactionController = require("../controllers/transaction.controller");
const validate = require("../middlewares/validateRequest");
const { setupWalletValidator } = require("../validators/wallet.validator");

const router = express.Router();

router.post(
  "/setup",
  setupWalletValidator,
  validate,
  walletController.setupWallet
);
router.get("/wallet/:id", walletController.getWalletDetails);
router.post("/transact/:walletId", transactionController.transaction);
router.get("/transactions", transactionController.getTransactions);

module.exports = router;

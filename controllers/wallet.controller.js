const { ValidationError, DatabaseError } = require("sequelize");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");
const { getTransactionType } = require("../utils/helpers");

const setupWallet = async (req, res, next) => {
  const acidTransaction = await Wallet.sequelize.transaction();
  try {
    const { name, balance } = req.body;

    const wallet = await Wallet.create(
      {
        name,
        balance: parseFloat(balance),
      },
      { transaction: acidTransaction }
    );
    console.log(`Created Wallet-----> ${wallet}`);

    const transaction = await Transaction.create(
      {
        walletId: wallet.id,
        amount: parseFloat(balance),
        balance: parseFloat(balance),
        description: "Initial Wallet Setup",
        type: getTransactionType(parseFloat(balance)),
      },
      { transaction: acidTransaction }
    );
    console.log(`Created Transaction-----> ${transaction}`);

    await acidTransaction.commit();

    res.status(200).json({
      id: wallet.id,
      balance: parseFloat(wallet.balance),
      name: wallet.name,
      date: wallet.createdAt,
    });
  } catch (err) {
    await transaction.rollback();
    if (err instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: err.errors.map((e) => ({ field: e.path, message: e.message })),
      });
    }
    if (err instanceof DatabaseError) {
      console.error("❌ Database error in setupWallet:", err.message);
      return res.status(500).json({
        success: false,
        error: "Database operation failed",
      });
    }
    console.error("❌ Error in setupWallet:", err);
    next(err);
  }
};

const getWalletDetails = async (req, res, next) => {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    console.log(`Fetched Wallet-----> ${wallet}`);
    if (!wallet) {
      const error = new Error("Wallet not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      id: wallet.id,
      name: wallet.name,
      balance: parseFloat(wallet.balance),
      date: wallet.createdAt,
    });
  } catch (err) {
    if (err instanceof DatabaseError) {
      console.error("❌ Database error in getWalletDetails:", err.message);
      return res.status(500).json({
        success: false,
        error: "Database operation failed",
      });
    }
    console.error("❌ Error in getWalletDetails:", err);
    next(err);
  }
};

module.exports = {
  setupWallet,
  getWalletDetails,
};

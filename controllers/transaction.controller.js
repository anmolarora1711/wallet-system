const { sequelize } = require("../database/sequelize");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");
const { getTransactionType } = require("../utils/helpers");

const transaction = async (req, res, next) => {
  const { walletId } = req.params;
  const { amount, description } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const wallet = await Wallet.findByPk(walletId, {
        lock: true,
        transaction: t,
      });
      if (!wallet) {
        const error = new Error("Wallet not found");
        error.statusCode = 404;
        throw error;
      }

      const currentBalance = parseFloat(wallet.balance);
      const transactionAmount = parseFloat(amount);
      const newBalance =
        Math.round((currentBalance + transactionAmount) * 100) / 100;
      if (newBalance < 0) {
        const error = new Error("Insufficient balance");
        error.statusCode = 400;
        throw error;
      }

      await wallet.update(
        {
          balance: newBalance,
        },
        { transaction: t }
      );

      const transaction = await Transaction.create(
        {
          walletId: wallet.id,
          amount: transactionAmount,
          balance: newBalance,
          description: description || "",
          type: getTransactionType(transactionAmount),
          status: "completed",
        },
        { transaction: t }
      );

      return { transaction, newBalance };
    });

    res.status(200).json({
      balance: result.newBalance,
      transactionId: result.transaction.id,
    });
  } catch (err) {
    if (err.statusCode) {
      return next(err);
    }

    console.error("Transaction error:", err);
    const error = new Error("Transaction failed");
    error.statusCode = 500;
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const { walletId, skip = 0, limit = 10 } = req.query;
    const transactions = await Transaction.findAll({
      where: { walletId },
      offset: parseInt(skip),
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(
      transactions.map((t) => ({
        id: t.id,
        walletId: t.walletId,
        amount: parseFloat(t.amount),
        balance: parseFloat(t.balance),
        description: t.description,
        date: t.createdAt,
        type: t.type,
      }))
    );
  } catch (err) {
    if (err.statusCode) {
      return next(err);
    }
    console.error("Get transactions error:", err);
    const error = new Error("Failed to retrieve transactions");
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  transaction,
  getTransactions,
};

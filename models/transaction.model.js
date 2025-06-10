const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Wallet = require("./wallet.model");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    walletId: { type: DataTypes.UUID, allowNull: false },
    amount: { type: DataTypes.DECIMAL(15, 4), allowNull: false },
    balance: { type: DataTypes.DECIMAL(15, 4), allowNull: false },
    description: { type: DataTypes.STRING },
    type: { type: DataTypes.ENUM("CREDIT", "DEBIT") },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "transactions",
  }
);

Wallet.hasMany(Transaction, { foreignKey: "walletId" });
Transaction.belongsTo(Wallet, { foreignKey: "walletId" });

module.exports = Transaction;

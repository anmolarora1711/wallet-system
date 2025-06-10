const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.DECIMAL(15, 4), allowNull: false },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "wallets",
  }
);

module.exports = Wallet;

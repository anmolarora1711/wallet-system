function getTransactionType(amount) {
  return parseFloat(amount) >= 0 ? "CREDIT" : "DEBIT";
}

module.exports = { getTransactionType };

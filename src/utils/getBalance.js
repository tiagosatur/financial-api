function getBalance(statement) {
  const balance = statement.reduce((total, operation) => {
    if (operation.type === "credit") {
      return total + operation.amount;
    }
    return total - operation.amount;
  }, 0);

  return balance;
}
module.exports = getBalance;

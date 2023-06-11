const removeFruitValidation = (name, amount, subfruit) => {
  if (!subfruit) {
    throw new Error(`${name} not found.`);
  }
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }
  if (subfruit.amount < amount) {
    throw new Error(`Insufficient amount of ${name} in storage.`);
  }
};

const storeFruitValidation = (amount, fruit, name) => {
  if (amount <= 0) {
    throw new Error("amount not be Zero");
  }
  if (!fruit) {
    throw new Error(`${name} is not present.`);
  }
};

module.exports = {
  removeFruitValidation,
  storeFruitValidation,
};

const findFruitByName = (name, subFruits_DB) => {
  return subFruits_DB.findOne({ name });
};

const updateFruitByName = (name, subfruit, subFruits_DB) => {
  return subFruits_DB.findOneAndUpdate(
    { name },
    { name, amount: subfruit.amount - amount },
    { new: true }
  );
};

const removeFruitByName = (name, subFruits_DB) => {
  return subFruits_DB.findOneAndRemove({ name });
};

const createFruit = (name, amount, subFruits_DB) => {
  return subFruits_DB.create({ name, amount });
};

module.exports = {
  findFruitByName,
  updateFruitByName,
  removeFruitByName,
  createFruit,
};

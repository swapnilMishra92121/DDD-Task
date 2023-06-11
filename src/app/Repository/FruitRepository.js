const createFruit = (name, description, limit, Fruits_DB) => {
  return Fruits_DB.create({ name, description, limit });
};

const findFruitByName = (name, Fruits_DB) => {
  return Fruits_DB.findOne({ name });
};

const removeFruitByName = (name, Fruits_DB) => {
  return Fruits_DB.findOneAndRemove({ name });
};

const updateFruitByName = (name, description, limit, Fruits_DB) => {
  return Fruits_DB.findOneAndUpdate(
    { name },
    { name, description, limit },
    { new: true }
  );
};

module.exports = {
  createFruit,
  findFruitByName,
  removeFruitByName,
  updateFruitByName,
};

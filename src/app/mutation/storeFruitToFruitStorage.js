const { nonNull, stringArg, intArg } = require("nexus");
const Fruits_DB = require("../../../db/model/FruitSchema_DB");
const subFruits_DB = require("../../../db/model/subFruitsSchema_DB");
const { storeFruitValidation } = require("../service/FruitStoreService");
const { findFruitByName } = require("../Repository/FruitRepository");
const { createFruit } = require("../Repository/FruitStoreRepository");
const { createInCollection } = require("../service/Helper");

const storeFruitToFruitStorage = {
  type: "subFruit",
  args: {
    name: nonNull(stringArg()),
    amount: nonNull(intArg()),
  },
  async resolve(_, { name, amount }) {
    const fruit = await findFruitByName(name, Fruits_DB);

    storeFruitValidation(amount, fruit, name);

    const selectedFruit = fruit;

    if (selectedFruit.limit >= amount) {
      const create = await createFruit(name, amount, subFruits_DB);
      createInCollection(name)
      return { name: create.name, amount: create.amount };
    } else {
      throw new Error(`Amount is greater than the limit.`);
    }
  },
};

module.exports = { storeFruitToFruitStorage };

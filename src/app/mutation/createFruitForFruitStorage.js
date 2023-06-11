const { nonNull, stringArg, intArg } = require("nexus");
const Fruits_DB = require("../../../db/model/FruitSchema_DB");
const { createFruitValidation } = require("../service/FruitService");
const { createFruit } = require("../Repository/FruitRepository");
const { createInCollection } = require("../service/Helper");

const createFruitForFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    limit: nonNull(intArg()),
  },
  async resolve(p, { name, description, limit }) {
    createFruitValidation(description, limit);
    const create = await createFruit(name, description, limit, Fruits_DB);
    createInCollection(name)
    return {
      name: create.name,
      description: create.description,
      limit: create.limit,
    };
  },
};

module.exports = { createFruitForFruitStorage };

const { nonNull, stringArg, intArg } = require("nexus");
const Fruits_DB = require("../../../db/model/FruitSchema_DB");
const { updateFruitValidation } = require("../service/FruitService");
const { updateFruitByName } = require("../Repository/FruitRepository");
const { updateInCollection } = require("../service/Helper");

const updateFruitForFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: stringArg(),
    limit: intArg(),
  },
  async resolve(p, { name, description, limit }) {
    updateFruitValidation(description, limit);

    const create = await updateFruitByName(name, description, limit, Fruits_DB)

    if (!create) {
      throw new Error(`${name} is not present.`);
    }
    updateInCollection(name)
    return {
      name: create.name,
      description: create.description,
      limit: create.limit,
    };
  },
};

module.exports = { updateFruitForFruitStorage };

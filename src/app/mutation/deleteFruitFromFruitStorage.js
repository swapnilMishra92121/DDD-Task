const { nonNull, stringArg, intArg, booleanArg } = require("nexus");
const Fruits_DB = require("../../../db/model/FruitSchema_DB");
const { deleteFruitValidation } = require("../service/FruitService");
const {
  findFruitByName,
  removeFruitByName,
} = require("../Repository/FruitRepository");
const { deleteInCollection } = require("../service/Helper");

const deleteFruitFromFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    forceDelete: booleanArg(),
  },
  async resolve(p, { name, forceDelete }) {
    const fruit = await findFruitByName(name, Fruits_DB);
    deleteFruitValidation(name, fruit, forceDelete);
    const remove = await removeFruitByName(name, Fruits_DB);
    deleteInCollection(name)
    return {
      name: remove.name,
      description: remove.description,
      limit: remove.limit,
    };
  },
};

module.exports = { deleteFruitFromFruitStorage };

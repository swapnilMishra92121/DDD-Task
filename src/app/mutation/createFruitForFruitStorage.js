const { nonNull, stringArg, intArg } = require("nexus");
const Fruits_DB = require("../../../db/model/FruitSchema_DB");
const { createFruitValidation } = require("../service/FruitService");
const { createFruit } = require("../Repository/FruitRepository");
const { createInCollection } = require("../service/Helper");
const mongoose = require("mongoose");

const createFruitForFruitStorage = {
  type: "Fruit",
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    limit: nonNull(intArg()),
  },
  async resolve(p, { name, description, limit }) {
    const session = mongoose.startSession();
    (await session).startTransaction();
    try {
      createFruitValidation(description, limit);
      const create = await createFruit(name, description, limit, Fruits_DB);
      (await session).commitTransaction();
      return {
        name: create.name,
        description: create.description,
        limit: create.limit,
      };
    } catch {
      console
        .log("")(await session)
        .abortTransaction();
      (await session).endSession();
    } finally {
      createInCollection(name);
      (await session).endSession();
    }
  },
};

module.exports = { createFruitForFruitStorage };

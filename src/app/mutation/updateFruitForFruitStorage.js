const { nonNull, stringArg, intArg } = require('nexus')
const fruitsDB = require('../../../db/model/FruitSchema_DB')
const { updateFruitValidation } = require('../service/FruitService')
const { updateFruitByName } = require('../Repository/FruitRepository')
const { updateInCollection } = require('../service/Helper')
const mongoose = require('mongoose')

const updateFruitForFruitStorage = {
  type: 'Fruit',
  args: {
    name: nonNull(stringArg()),
    description: stringArg(),
    limit: intArg()
  },
  async resolve (p, { name, description, limit }) {
    const session = mongoose.startSession();
    (await session).startTransaction()
    try {
      updateFruitValidation(description, limit)

      const create = await updateFruitByName(
        name,
        description,
        limit,
        fruitsDB
      )

      if (!create) {
        throw new Error(`${name} is not present.`)
      }
      updateInCollection(name);
      (await session).commitTransaction()
      return {
        name: create.name,
        description: create.description,
        limit: create.limit
      }
    } catch {
      console
        .log('')(await session)
        .abortTransaction();
      (await session).endSession()
    } finally {
      updateInCollection(name);
      (await session).endSession()
    }
  }
}

module.exports = { updateFruitForFruitStorage }

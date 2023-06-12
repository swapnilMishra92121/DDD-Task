const { nonNull, stringArg, booleanArg } = require('nexus')
const fruitsDB = require('../../../db/model/FruitSchema_DB')
const { deleteFruitValidation } = require('../service/FruitService')
const {
  findFruitByName,
  removeFruitByName
} = require('../Repository/FruitRepository')
const { deleteInCollection } = require('../service/Helper')
const mongoose = require('mongoose')

const deleteFruitFromFruitStorage = {
  type: 'Fruit',
  args: {
    name: nonNull(stringArg()),
    forceDelete: booleanArg()
  },
  async resolve (p, { name, forceDelete }) {
    const session = mongoose.startSession();
    (await session).startTransaction()
    try {
      const fruit = await findFruitByName(name, fruitsDB)
      deleteFruitValidation(name, fruit, forceDelete)
      const remove = await removeFruitByName(name, fruitsDB);
      (await session).commitTransaction()
      return {
        name: remove.name,
        description: remove.description,
        limit: remove.limit
      }
    } catch {
      console
        .log('')(await session)
        .abortTransaction();
      (await session).endSession()
    } finally {
      deleteInCollection(name);
      (await session).endSession()
    }
  }
}

module.exports = { deleteFruitFromFruitStorage }

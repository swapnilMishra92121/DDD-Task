const { nonNull, stringArg, intArg } = require('nexus')
const subFruitsDB = require('../../../db/model/subFruitsSchema_DB')
const { removeFruitValidation } = require('../service/FruitStoreService')
const {
  findFruitByName,
  updateFruitByName,
  removeFruitByName
} = require('../Repository/FruitStoreRepository')
const { deleteInCollection } = require('../service/Helper')
const mongoose = require('mongoose')

const removeFruitFromFruitStorage = {
  type: 'subFruit',
  args: {
    name: nonNull(stringArg()),
    amount: nonNull(intArg())
  },
  async resolve (p, { name, amount }) {
    const session = mongoose.startSession();
    (await session).startTransaction()
    try {
      const subfruit = await findFruitByName(name, subFruitsDB)
      removeFruitValidation(name, amount, subfruit)
      if (amount > 0 && amount !== subfruit.amount) {
        const updatedFruit = await updateFruitByName(
          name,
          subfruit,
          subFruitsDB,
          amount
        );
        (await session).commitTransaction()
        return { name: updatedFruit.name, amount: updatedFruit.amount }
      } else if (amount === subfruit.amount) {
        const removedFruit = await removeFruitByName(name, subFruitsDB)
        return { name: removedFruit.name, amount: 0 }
      }
    } catch {
      console
        .log('')(await session)
        .abortTransaction();
      (await session).endSession()
    } finally {
      (await session).commitTransaction()
      deleteInCollection(name);
      (await session).endSession()
    }
  }
}

module.exports = { removeFruitFromFruitStorage }

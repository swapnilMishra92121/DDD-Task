const { extendType } = require('nexus')
const { createFruitForFruitStorage } = require('./createFruitForFruitStorage')
const { storeFruitToFruitStorage } = require('./storeFruitToFruitStorage')
const { removeFruitFromFruitStorage } = require('./removeFruitFromFruitStorage')
const { updateFruitForFruitStorage } = require('./updateFruitForFruitStorage')
const { deleteFruitFromFruitStorage } = require('./deleteFruitFromFruitStorage')

const FruitMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('createFruitForFruitStorage', createFruitForFruitStorage)
    t.field('storeFruitToFruitStorage', storeFruitToFruitStorage)
    t.field('removeFruitFromFruitStorage', removeFruitFromFruitStorage)
    t.field('updateFruitForFruitStorage', updateFruitForFruitStorage)
    t.field('deleteFruitFromFruitStorage', deleteFruitFromFruitStorage)
  }
})

module.exports = { FruitMutation }

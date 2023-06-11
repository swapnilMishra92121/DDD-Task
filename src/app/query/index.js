const { extendType } = require('nexus')
const { findFruit } = require('./findFruit')

const FruitQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('findFruit', findFruit)
    }
})

module.exports = { FruitQuery }
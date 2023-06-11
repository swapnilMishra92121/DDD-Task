const { objectType } = require('nexus')
const {FruitQuery}=require('./query/index')
const {FruitMutation}=require('./mutation/index')


const Fruit = objectType({
    name: 'Fruit',
    definition(t) {
        t.string('name')
        t.string('description')
        t.int('limit')
    },
})

const subFruit = objectType({
    name: 'subFruit',
    definition(t) {
        t.string('name')
        t.int('amount')
    },
})



module.exports = {
    FruitQuery,
    Fruit,
    subFruit,
    FruitMutation,
}
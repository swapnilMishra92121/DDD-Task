const Fruits_DB = require('../../../db/model/FruitSchema_DB')
const { stringArg } = require('nexus')

const findFruit = {
    type: 'Fruit',
    args: {
        name: stringArg()
    },
    async resolve(p, { name }, l) {
        const fruit = await Fruits_DB.find(name ? { name } : {})
        if (name && !fruit.length) {
            throw new Error(`${name} not found.`);
        }
        return fruit
    }
}

module.exports = { findFruit }

//fix error
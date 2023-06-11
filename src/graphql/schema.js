const { makeSchema  } = require('nexus');


const {
    FruitQuery,
    Fruit,
    FruitMutation,
    subFruit
} = require("../app/SchemaObject");


const schema = makeSchema({
    types: [
        FruitQuery,
        Fruit,
        FruitMutation,
        subFruit
    ],
    outputs: {
        schema: __dirname + '/schema.graphql',
        typegen: __dirname + '/typings.ts',
    },
});




module.exports = { schema }
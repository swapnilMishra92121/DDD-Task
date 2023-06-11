const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { schema } = require('./graphql/schema');
const connectivity = require("../db/connectivity");
require('dotenv').config()



const server = new ApolloServer({
    schema
});



//start
const start = async () => {
    try {
        connectivity(process.env.mongodb_connectivity)
        await startStandaloneServer(server, {
            listen: { port: 4000 },
        }).then((val)=>{
            console.log('connect')
        })
    } catch {
        console.log('not connect...')
    }
}

start()

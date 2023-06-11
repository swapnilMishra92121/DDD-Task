const mongoose = require('mongoose')


const Fruits = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String
    },
    limit: {
        type: Number
    }
})





module.exports = mongoose.model('Fruits', Fruits)

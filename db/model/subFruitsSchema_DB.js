const mongoose = require('mongoose')

const subFruits = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    amount: {
        type: Number
    }
})



module.exports = mongoose.model('subFruits', subFruits)
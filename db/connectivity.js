const mongoose = require('mongoose')


const connectivity = async (url) => {
 await mongoose.connect(url)
}

module.exports = connectivity
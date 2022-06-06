const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    passenger: {
        type: Number,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    startRent: {
        type: String,
    },
    finishRent: {
        type: String,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    },
    image: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    }
})

module.exports = mongoose.model('Car', carSchema);
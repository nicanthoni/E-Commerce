const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vendor'
    },
    inventory: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
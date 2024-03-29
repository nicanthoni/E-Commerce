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
    description: {
        type: String,
        maxlength: 2000
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
    },
    inCart: {
        type: Number,
        default: 0
    },
    ratings: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Rating'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
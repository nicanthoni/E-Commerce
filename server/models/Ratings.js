const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true
    },
    review: {
        type: String,
        maxlength: 500
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating
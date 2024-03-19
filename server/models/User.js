const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        }
    ],
    cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        }
    ]
})

userSchema.virtual('total').get(function () {
    let totalPrice = this.cart.reduce((total, item => total + item.price, 0))
    return totalPrice
})
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxlength: 20,
        required: false
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        maxlength: 100,
        match: /.+\@.+\..+/,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    wishlist: [{
        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    cart: [{
        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            default: 1, 
            min: 1,
            max: 10
        }
    }],
    buyHistory: [{
        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    ratings: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Rating'
    }]
}, 
{ timestamps: true }
)

userSchema.virtual('total').get(function () {
    let totalPrice = this.cart.reduce((total, item) => {
        const itemPrice = item.item.price * item.quantity
        return total + itemPrice
    }, 0)
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
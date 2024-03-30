const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxlength: 20,
        required: true
    },
    companyname: {
        type: String,
        unique: true,
        maxlength: 100,
        required: true
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
        maxlength: 100,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    inventory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        }
    ],
    sales: [{
        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        },
        sold: {
            type: Number,
        }
    }]
})
vendorSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

vendorSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const Vendor = mongoose.model('Vendor', vendorSchema)

module.exports = Vendor
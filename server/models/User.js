const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        unique: true,
        required: [true, 'must give a username']
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 40,
        trim: true,
        required: [true, 'must give a password']
    },
    first_name: {
        type: String,
        maxLength: 20,
        trim: true,
        required: [true, 'must give a first name']
    },
    last_name: {
        type: String,
        maxLength: 20,
        trim: true,
        required: [true, 'must give a last name']
    },
    email: {
        type: String,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'must give a valid email'
        ],
        unique: true,
        required: [true, 'must give a email address']
    },
    phone_number: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        trim: true,
        unique: true,
        required: [true, 'must give a phone number']
    },
    friends: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (givenPassword) {
    const isMatch = await bcrypt.compare(givenPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
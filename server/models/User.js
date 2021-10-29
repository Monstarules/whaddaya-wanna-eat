const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
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
        required: [true, 'must give a email address']
    },
    phone_number: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        trim: true,
        required: [true, 'must give a phone number']
    },
    friends: {
        type: Array
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    }
})

module.exports = mongoose.model('User', UserSchema)
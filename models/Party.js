const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    user_ids: {
        type: Array,
        maxLength: 7,
        required: [true, 'must have at least 1 user id']
    }
})

module.exports = mongoose.model('Party', PartySchema)
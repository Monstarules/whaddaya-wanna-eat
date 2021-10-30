const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    User_IDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Party', PartySchema)
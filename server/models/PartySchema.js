const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    // Party Code for inviting Users
    code: { type: String, max: 5, uppercase: true, required: true},

    // Stores in Specfic Users
    User_IDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    // Stores list of resturants added by Users
    resturant_List: [{type: String}]

})

module.exports = mongoose.model('Party', PartySchema)
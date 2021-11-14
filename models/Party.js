const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    // Party Code for inviting Users
    code: { 
        type: String, 
        max: 5, 
        uppercase: true, 
        required: true
    },
    // Stores in Specfic Users
    //User_IDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    User_IDs: {
        type: Array,
        default: []
    },

    // Stores list of resturants added by Users
    resturant_List: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Party', PartySchema)
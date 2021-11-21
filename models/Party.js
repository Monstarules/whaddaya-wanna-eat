const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    // Party Code for inviting Users
    code: { 
        type: String,
        unique: true,
        max: 10 
    },

    // Stores in Specfic Users
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

// PartySchema.pre('save', function() {
//     // hashes password
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    
//     // initialize return string
//     let retval = ""
    
//     // gives 10,000 tries at randomly generating unique code
//     for(let i = 0; i < 10; i++){
        
//         // loop creating a 6 char string
//         for(let j = 0; j < 10; j++) {
//             retval = retval + chars[Math.floor(Math.random()*36)]
//         }
        
//         // check to ensure code is unique
//         // const check = await mongoose.model('Party', PartySchema).findOne({ code: retval })
//         //if (check === null){
//             this.code = retval
//             break 
//         //}
//     }

// })

module.exports = mongoose.model('Party', PartySchema)
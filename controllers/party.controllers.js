const Party = require('../models/Party')

// Create a Party (take in User id) 
const createParty = async (req, res) => {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    
    // initialize party id string
    let partyCode = ""
    
    // gives 10,000 tries at randomly generating unique code
    for(let i = 0; i < 10; i++){
        
        // loop creating a 6 char string
        for(let j = 0; j < 10; j++) {
            partyCode = partyCode + chars[Math.floor(Math.random()*36)]
        }
        
        const check = await Party.findOne({ code: partyCode })

        if (!check) break 
        console.log(i)
        partyCode = ''
    }

    try {
        // save party to database
        const party = await Party.create({ code: partyCode })
        party.User_IDs.push(req.user.user_id)
        party.save()

        res.status(201).json({ status: 'success', party: party, message: 'Party Created' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Delete Party (take in UNIQUE party code) 
const deleteParty = async(req, res) => {
    const partyCode = req.body.code

    try {
        const party = await Party.findOneAndDelete({code: partyCode.toUpperCase()})

        if (!party) {
            return res.status(404).json({ status: 'failure', message: 'Party does not exist'})
        }

        res.status(200).json({ status: 'success', party: party, message: 'Party deleted' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Join Party (take in party CODE & user id)   
const joinParty = async (req, res) => {
    
    const partyCode = req.body.code
    const userid = req.user.user_id

    try {
        const party = await Party.findOneAndUpdate(
            {
                code: partyCode.toUpperCase()
            }, 
            {
                $push: { 
                    User_IDs: userid 
                } 
            },
            {
                'new':true
            })

        if (!party) {
            return res.status(404).json({ status: 'failure', message: 'Party does not exist'})
        }

        res.status(200).json({ status: 'success', party: party, message: 'Party Joined'})
    }
    catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Leave Party (take in party code)
const leaveParty = async (req, res) => {
    const partyCode = req.body.code
    const userid = req.user.user_id

    try {
        const party = await Party.findOneAndUpdate(
            {
                code: partyCode.toUpperCase()
            },  
            {
                $pull: { 
                    User_IDs: userid  
                },
            },
            {
                'new':true
            }
        )

        if (!party) {
            return res.status(404).json({ status: 'failure', message: 'Party does not exist'})
        }

        res.status(200).json({ status: 'success', party: party, message: 'Party Left' })
    }
    catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Add to temp resturant list
const addToList = async (req, res) => {

    const partyCode = req.body.code
    const resturantName = req.body.resturantName

    try {
        await Party.findOneAndUpdate({code: partyCode}, {$push: {resturant_List: resturantName} },{'new':true})
        res.status(200).json({ status: 'success', message: 'Resturant Added'})
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

module.exports = {
    createParty,
    deleteParty,
    joinParty,
    leaveParty,
    addToList
}

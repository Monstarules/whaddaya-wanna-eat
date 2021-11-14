const Party = require('../models/Party')

// Create a Party (take in User id) 
const createParty = async (req, res) => {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    
    // initialize return string
    let retval = ""
    
    // gives 10,000 tries at randomly generating unique code
    for(let i = 0; i < 10; i++){
        
        // loop creating a 6 char string
        for(let j = 0; j < 10; j++) {
            retval = retval + chars[Math.floor(Math.random()*36)]
        }
        
        const check = await Party.findOne({ code: retval })

        if (!check) break 
        console.log(i)
        retval = ''
    }

    try {
        // save party to database
        const party = await Party.create({ code: retval })
        party.User_IDs.push(req.user.user_id)
        party.save()

        res.status(201).json({ status: 'success', party: party, message: 'Party Created' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Delete Party (take in Party id) 
const deleteParty = async(req, res) => {
    try {
        const party = await Party.findByIdAndDelete(req.params.partyid)

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
    
    const partyCode = req.params.code
    const userid = req.user.user_id

    try {
        const party = await Party.findOneAndUpdate(
            {
                code: partyCode
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

// Leave Party (take in party id & user id)
const leaveParty = async (req, res) => {
    const partyid = req.params.partyid
    const userid = req.user.user_id

    try {
        const party = await Party.findByIdAndUpdate(
            partyid, 
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
const addList = async (req, res) => {

    const partyCode = req.params.code
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
    addList
}
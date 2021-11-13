const Party = require('../models/PartySchema')

// Create a Party (take in User id) 
const createParty = async (req, res) => {
    
    // Setup new Party
    const party = new Party ({
        code: req.body.code
    })

    // Push the User's ID into the party array
    party.User_IDs.push(req.params.id)

    try {
        // save party to database
        const newParty =  await party.save()
        res.status(201).json({ status: 'success', message: 'Party Created' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Delete Party (take in Party id) 
const deleteParty = async(req, res) => {
    try {
        await Party.findByIdAndDelete(req.params.partyid)
        res.status(200).json({ status: 'success', message: 'Party deleted' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Join Party (take in party CODE & user id)   
const joinParty = async (req, res) => {
    
    const partyCode = req.params.code
    const userid = req.params.userid

    try {
        await Party.findOneAndUpdate({code: partyCode}, {$push: {User_IDs: userid} },{'new':true})
        res.status(200).json({ status: 'success', message: 'Party Joined'})
    }
    catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

// Leave Party (take in party id & user id)
const leaveParty = async (req, res) => {

    const partyid = req.params.partyid
    const userid = req.params.userid

    try {
        await Party.findByIdAndUpdate({_id: partyid}, {$pull: {User_IDs: userid} },{'new':true})
        res.status(200).json({ status: 'success', message: 'Party Left' })
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
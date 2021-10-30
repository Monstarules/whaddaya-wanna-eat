const express = require('express')
const router = express.Router()
const Party = require('../models/PartySchema')

// Create a Party (take in User id) WORKING
router.post('/:id', async (req, res) => {
    
    // Setup new Party
    const party = new Party

    // Push the User's ID into the party array
    party.User_IDs.push(req.params.id)

    try {
        // save party to database
        const newParty =  await party.save()
        res.status(201).json({message: 'Party Created'})
    } catch (err) {
        res.status(500).json({message: 'Error'})
    }
})

// Delete Party (take in Party id) WORKING
router.delete('/:partyid', async(req, res) => {
    try {
        await Party.findByIdAndDelete(req.params.partyid)
        res.status(200).json({message: 'Party deleted'})
    } catch (err) {
        res.status(500).json({message: 'Error'})
    }

})

// Join Party (take in party id & user id)   
router.patch('/:partyid/:userid', async (req, res) => {
    
    const partyid = req.params.partyid
    const userid = req.params.userid

    try {
        await Party.findByIdAndUpdate({_id: partyid}, {$push: {User_IDs: userid} },{'new':true})
        res.status(200).json({message: 'Party Joined'})
    }
    catch (err) {
        res.status(500).json({message: 'Error'})
    }
})

// Leave Party (take in party id & user id)
router.delete('/:partyid/:userid', async (req, res) => {

    const partyid = req.params.partyid
    const userid = req.params.userid

    try {
        await Party.findByIdAndUpdate({_id: partyid}, {$pull: {User_IDs: userid} },{'new':true})
        res.status(200).json({message: 'Party Left'})
    }
    catch (err) {
        res.status(500).json({message: 'Error'})
    }
})

module.exports = router
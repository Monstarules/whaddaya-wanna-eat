const express = require('express')
const router = express.Router()

const {createParty, deleteParty, joinParty, leaveParty, addList} = require('../controllers/party.controllers')

// Create Party Route
router.route('/:id').post(createParty)

// Delete Party Route
router.route('/:partyid').delete(deleteParty)

// Join Party Route
router.route('/:code/:userid').patch(joinParty)

// Leave Party Route
router.route('/:partyid/:userid').delete(leaveParty)

// Add to Resturant List Route
router.route('/:code').patch(addList)

module.exports = router
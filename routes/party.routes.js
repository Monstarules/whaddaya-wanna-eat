const express = require('express')
const router = express.Router()

const {createParty, deleteParty, joinParty, leaveParty, addList} = require('../controllers/party.controllers')

// Create Party Route
router.route('/create').post(createParty)

// Delete Party Route
router.route('/delete').delete(deleteParty).patch(leaveParty)

// Join Party Route
router.route('/join').patch(joinParty)

// Add to Resturant List Route
//router.route('/:code').patch(addList)

module.exports = router
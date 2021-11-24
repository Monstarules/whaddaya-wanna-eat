const express = require('express')
const router = express.Router()
const auth = require('../middleware/authenticate')

const {createParty, deleteParty, joinParty, leaveParty, addList} = require('../controllers/party.controllers')

// Create Party Route
router.route('/create').post(auth, createParty)

// Delete Party Route
router.route('/delete').put(auth, deleteParty)

// leave party route
router.route('/leave').patch(auth, leaveParty)

// Join Party Route
router.route('/join').patch(auth, joinParty)

// Add to Resturant List Route
//router.route('/:code').patch(addList)

module.exports = router
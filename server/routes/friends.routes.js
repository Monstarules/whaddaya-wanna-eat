const express = require('express')
const router = express.Router()

const {getUser, addFriend, removeFriend, getFriends} = require('../controllers/friends.controllers')

router.route('/:userid').get(getUser)

router.route('/:userid/:fid').put(addFriend)

router.route('/:userid/:fid').delete(removeFriend)

router.route('/:userid').get(getFriends)

module.exports = router

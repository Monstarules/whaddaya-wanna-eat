const express = require('express')
const router = express.Router()

const { register, login, verifyAccount } = require('../controllers/users.controllers')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/confirm/:confirmationCode').patch(verifyAccount)

module.exports = router
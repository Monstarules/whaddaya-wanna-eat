const express = require('express')
const router = express.Router()

const { register, login, verifyAccount, sendPasswordReset, resetPassword } = require('../controllers/users.controllers')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/confirm/:confirmationCode').patch(verifyAccount)
router.route('/resetPassword').post(sendPasswordReset)
router.route('/resetPassword/:id').patch(resetPassword)

module.exports = router
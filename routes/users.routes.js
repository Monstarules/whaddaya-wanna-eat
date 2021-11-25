const express = require('express')
const router = express.Router()
const auth = require('../middleware/authenticate')

const { register, login, verifyAccount, sendPasswordReset, resetPassword, editProfile, getProfile, editPassword } = require('../controllers/users.controllers')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/confirm/:confirmationCode').get(verifyAccount) // was patch before
router.route('/resetPassword').post(sendPasswordReset)
router.route('/resetPassword/:id').patch(resetPassword)
router.route('/edit').patch(auth, editProfile)
router.route('/getUser').get(auth, getProfile)
router.route('/editPassword').patch(auth, editPassword)

module.exports = router
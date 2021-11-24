const jwt = require('jsonwebtoken')
const { sendConfirmationEmail, sendPasswordResetEmail } = require('../config/nodemailer')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        
        if (!user) {
            return res.status(500).json({ status: 'failure', message: 'User object is undefined'})
        }

        const username = user['username']
        const email = user['email']
        const code = user['confirmation_code']
       
        sendConfirmationEmail(username, email, code)
        
        res.status(201).json({ status: 'success', message: 'User has been created' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (user.length === 0) {
            return res.status(404).json({ message: "User does not exist" })
        }

        if (user['status'] != 'Active') {
            return res.status(401).json({ status: 'failure', message: 'Pending account' })
        }

        const isPassword = await user.comparePassword(req.body.password)

        if (!isPassword) {
            return res.status(500).json({ status: 'failure', message: 'Wrong password' })
        }

        const userObject = Object.values(user)
        const token = jwt.sign({ user_id: JSON.parse(JSON.stringify(userObject[0]._id)) }, process.env.JWT_SECRET)

        res.status(200).json({ status: 'success', token: token, message: 'User has logged in' })
    } catch (error) {
        res.status(500).json({ status: 'failue', message: error })
    }
}

const verifyAccount = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ confirmation_code: req.params.confirmationCode}, { status: 'Active' })
        
        if (!user) {
            return res.status(404).json({ status: 'failure', message: 'User not found' })
        }

        res.status(200).json({ status: 'success', message: 'account has been verified' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error})
    }
}

// req.body contains a json with only an email address
const sendPasswordReset = async (req, res) => {
    try {
        const user = await User.findOne(req.body)

        if (!user) {
            return res.status(404).json({ status: 'failure', message: 'User not found'})
        }

        sendPasswordResetEmail(user['username'], user['email'], user['_id'].toString())

        res.status(200).json({ status: 'success', message: 'password reset email has been sent'})
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            return res.status(404).json({ status: 'failure', message: 'User not found' })
        }

        const newPassword = await user.updatePassword(req.body.password)

        console.log(newPassword)

        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, { password: newPassword })

        res.status(200).json({ status: 'success', message: 'Password has been reset' })
    } catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

const editProfile = async (req, res) => {
    const userid = req.user.user_id
    const newFirstName = req.body.first_name
    const newLastName = req.body.last_name

    try {
        const user = await User.findByIdAndUpdate(userid,{"$set":{"first_name": newFirstName, "last_name": newLastName}})

        if (!user)
        {
            return res.status(404).json({ status: 'failure', message: 'User does not exist'}) 
        }
        res.status(200).json({ status: 'success', user: user, message: 'User Profile updated' })
    }
    catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

const getProfile = async (req, res) => {
    const userid = req.user.user_id

    try {
        const user = await User.findbyId(userid).exec()
        
        if (!user)
        {
            return res.status(404).json({ status: 'failure', message: 'User does not exist'}) 
        }
        res.status(200).json({ status: 'success', user: user, message: 'User Got' })
    }
    catch (error) {
        res.status(500).json({ status: 'failure', message: error })
    }
}

module.exports = {
    register,
    login,
    verifyAccount,
    sendPasswordReset,
    resetPassword,
    editProfile,
    getProfile
}
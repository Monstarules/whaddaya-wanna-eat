const jwt = require('jsonwebtoken')
const sendConfirmationEmail = require('../config/nodemailer')
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
        
        res.status(201).json({ status: 'success'})
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
            return res.status(401).json({ message: 'Pending account'})
        }

        const isPassword = await user.comparePassword(req.body.password)

        if (!isPassword) {
            return res.status(500).json({ message: 'Wrong password'})
        }

        const userObject = Object.values(user)
        const token = jwt.sign({ user_id: JSON.parse(JSON.stringify(userObject[0]._id)) }, process.env.JWT_SECRET)

        res.status(200).json({ status: 'success', token: token })
    } catch (error) {
        res.status(500).json({ status: 'failue', message: error })
    }
}

const verifyAccount = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ confirmation_code: req.params.confirmationCode}, { status: 'Active' })
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ status: 'success' })
    } catch (error) {
        res.status(500).json({ message: error})
    }
}

module.exports = {
    register,
    login,
    verifyAccount
}
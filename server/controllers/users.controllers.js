const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ status: 'success'})
    } catch (error) {
        res.status(500).json({ status: 'failure', msg: error })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (user.length === 0) {
            return res.status(404).json({ msg: "user does not exist" })
        }

        const isPassword = await user.comparePassword(req.body.password)

        if (!isPassword) {
            return res.status(500).json({ msg: 'wrong password'})
        }

        const userObject = Object.values(user)
        const token = jwt.sign({ user_id: JSON.parse(JSON.stringify(userObject[0]._id)) }, process.env.JWT_SECRET)

        res.status(200).json({ status: 'success', token: token })
    } catch (error) {
        res.status(500).json({ status: 'failue', msg: error })
    }
}

module.exports = {
    register,
    login
}
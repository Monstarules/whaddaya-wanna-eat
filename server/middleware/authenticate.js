const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer')) {
        return console.log('header error')
    }

    const token = header.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { user_id: payload.user_id}
        next()
    } catch (error) {
        console.log('error')
    }
}

module.exports = auth
const nodemailer = require('nodemailer')

const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS

const transport = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',    
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass 
    }
})

const sendConfirmationEmail = async (username, email, confirmationCode) => {
    try {
        const confirmationEmail = await transport.sendMail({
            from: user,
            to: email,
            subject: 'Confirm account',
            html: `<h1>Email Confirmation</h1>
                <h2>Hello ${username}</h2>
                <p>Thank you for creating an account on whaddya-wanna-eat. Please confirm your email by clicking on the following link</p>
                <a href=https://waddaya-wanna-eat.herokuapp.com/confirm/${confirmationCode}> Click here</a>
                </div>`,
        })
    } catch (error) {
        console.log(error)
    }
}

const sendPasswordResetEmail = async (username, email, userId) => {
    try {
        const resetPassword = await transport.sendMail({
            from: user,
            to: email,
            subject: 'Reset Password',
            html: `<h1>Reset Password</h1>
                <h2>Hello ${username}</h2>
                <p>Click on the link below to reset your password. If this is not you please disregard this email.</p>
                <a href=https://waddaya-wanna-eat.herokuapp.com/resetPassword/${userId}> Click here</a>
                </div>`,
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendConfirmationEmail, sendPasswordResetEmail }

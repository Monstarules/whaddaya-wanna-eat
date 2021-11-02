require('dotenv').config()

const express = require('express')
const app = express()

const connect = require('./config/database')
const users = require('./routes/users.routes.js')
const Partys = require('./routes/party.routes.js')

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/users', users)

app.use('/Party', Partys)



const start = async () => {
    try {
        await connect()
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
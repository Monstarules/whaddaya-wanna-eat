require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const path = require('path')

const connect = require('./config/database')
const users = require('./routes/users.routes.js')
const party = require('./routes/party.routes')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/users', users)
app.use('/api/party', party)

app.use(express.static(path.join(__dirname, '/app/build')))

const start = async () => {
    try {
        await connect()
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
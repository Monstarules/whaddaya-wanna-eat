require('dotenv').config()

const express = require('express')
const app = express()

const connect = require('./config/database')

const port = process.env.PORT || 3000

app.use(express.json())

const start = async () => {
    try {
        await connect()
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
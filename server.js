require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const path = require('path')

const connect = require('./config/database')
const auth = require('./middleware/authenticate')
const users = require('./routes/users.routes.js')
const party = require('./routes/party.routes')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/users', users)
app.use('/api/party', auth, party)

app.use(express.static(path.join(__dirname, '/app/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/app/build/index.html'));
});

const start = async () => {
    try {
        await connect()
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

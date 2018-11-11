const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const { syncAndSeed } = require('./db')
const { User, Contact } = require('./db').models

app.use(bodyParser.urlencoded({ extended: false }))



app.get('/users', (req, res) => {
    User.findAll()
        .then(contacts => res.send(contacts))
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
})

app.get('/contacts', (req, res) => {
    Contact.findAll()
        .then(contacts => res.send(contacts))
})

app.post('/contacts/create', (req, res) => {
    Contact.create(req.body)
    .then(contact => res.send(contact))
})


//Twilio
var MessagingResponse = require('twilio').twiml.MessagingResponse
const { accountSid, authToken } = require('../env.js').credentials


//Sending Text
const client = require('twilio')(accountSid, authToken)

app.get('/messages', async (req, res) => {
    let messages = await client.messages.list()
    res.send(messages)
})

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse()
    console.log('******',req.body)
    if (req.body.From == '+19177563318'){
        twiml.message('Hey Amr, I am currently detached from my phone. I will be back online soon -- sent with detach app')
    } else {
        twiml.message('Hey, I am currently detached from my phone. I will be back online soon -- sent with detach app');
    }
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString())
})

app.use(express.static(path.join(__dirname, `..`, `dist`)))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

http.createServer(app).listen(port, () => {
    console.log(`I am listening to ${port}`)
})


syncAndSeed()
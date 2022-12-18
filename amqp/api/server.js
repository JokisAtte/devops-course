//const express = require('express');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const getMessages = require('./endpoints/messages.js')
const runLog = require('./endpoints/runlog.js')
const { getState, putState } = require('./endpoints/state.js')

const server = express()

server.use(cors())
server.use(morgan('combined'))
server.use(express.text({ type: '*/*' })) //Any Content-Type is populated in request body as text
let STATE = 'INIT'

server.get('/messages', async (req, res) => {
    const messages = await getMessages()
    res.status(200).send(messages)
})

server.put('/state', (req, res) => {
    const states = ['INIT', 'PAUSED', 'RUNNING', 'SHUTDOWN']
    const body = req.body
    const newState = body.replace(/['"]+/g, '') // trim quotemarks from the input
    console.log('Uus state:', newState)
    console.log('Vanha state:', STATE)
    console.log(states.includes(newState))
    console.log(newState != STATE)
    if (states.includes(newState) && newState != STATE) {
        const result = putState(newState)
        if (result) {
            STATE = newState
            res.status(200).send()
        }
    }
    res.status(400).send('bad request or new state is equal to previous state')
})

server.get('/state', (req, res) => {
    res.status(200).send(STATE)
})

server.get('/run-log', (req, res) => {
    runLog()
})

module.exports = server

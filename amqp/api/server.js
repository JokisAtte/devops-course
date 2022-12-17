//const express = require('express');
const express =  require("express");
const bodyParser =  require("body-parser");
const cors =  require("cors");
const morgan =  require("morgan");

const getMessages =  require("./endpoints/messages.js");
const runLog =  require("./endpoints/runlog.js");
const {getState, putState} =  require("./endpoints/state.js");

const server = express();

server.use(cors())
server.use(morgan('combined'));
server.use(express.text({type:"*/*"})) //Any Content-Type is populated in request body as text
let STATE = "INIT"

server.get("/messages", async (req,res) => {
    const messages = await getMessages()
    res.status(200).send(messages)
})

server.put("/state", (req,res) => {
    const states = ["INIT", "PAUSED", "RUNNING","SHUTDOWN"]
    const newState = req.body
    if(states.includes(newState)){}
    putState()
})

server.get("/state", (req,res)=> {
    res.status(200).send(STATE)
})

server.get("/run-log", (req,res)=> {
    runLog()
})

module.exports = server
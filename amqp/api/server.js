//const express = require('express');
const express =  require("express");
const bodyParser =  require("body-parser");
const cors =  require("cors");
const morgan =  require("morgan");

const getMessages =  require("./endpoints/messages.js");
const runLog =  require("./endpoints/runlog.js");
const {getState, putState} =  require("./endpoints/state.js");

const server = express();

//server.use(bodyParser.json())
server.use(cors())
server.use(morgan('combined'));

server.get("/messages", async (req,res) => {
        const messages = await getMessages()
        res.status(200).send(messages)
})

server.put("/state", (req,res) => {
    putState()
})

server.get("/state", (req,res)=> {
    getState()
})

server.get("/run-log", (req,res)=> {
    runLog()
})

module.exports = server
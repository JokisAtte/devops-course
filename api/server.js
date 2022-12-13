//const express = require('express');
const express =  require("express");
const bodyParser =  require("body-parser");
const cors =  require("cors");
const morgan =  require("morgan");

const getMessages =  require("./endpoints/messages.js");
const getState =  require("./endpoints/getState.js");
const runLog =  require("./endpoints/runlog.js");
const putState =  require("./endpoints/putState.js");

const server = express();

//server.use(bodyParser.json())
server.use(cors())
server.use(morgan('combined'));

server.get("/messages", (req,res) => {
    getMessages()
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
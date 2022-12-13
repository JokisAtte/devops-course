//const express = require('express');
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import morgan from "morgan";

import getMessages from "./endpoints/messages.js";
import getState from "./endpoints/getState.js";
import runLog from "./endpoints/runlog.js";
import putState from "./endpoints/putState.js";

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

export default server
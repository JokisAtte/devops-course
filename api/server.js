//const express = require('express');
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import morgan from "morgan";

import getMessages from "./endpoints/messages";
import getState from "./endpoints/getState";
import runLog from "./endpoints/runlog";
import putState from "./endpoints/putState";

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

/* const port = 8083
server.listen(port, () =>
console.log(`Server running on port ${port}, http://localhost:${port}`)
); */

export default server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const server = express();
server.use(bodyParser.json())
server.use(cors())
server.use(morgan('combined'));

server.get("/messages", (req,res) => {
    // TODO
    console.log("/messages Not implemented")
})

server.put("/state", (req,res) => {
    // TODO
    console.log("put /state Not implemented")
})

server.get("/state", (req,res)=> {
    // TODO
    console.log("get /state Not implemented")
})

server.get("/run-log", (req,res)=> {
    // TODO
    console.log("/run-log Not implemented")
})

export default server
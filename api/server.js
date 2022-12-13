//const express = require('express');
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import morgan from "morgan";

const server = express();
//server.use(bodyParser.json())
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

/* const port = 8083
server.listen(port, () =>
console.log(`Server running on port ${port}, http://localhost:${port}`)
); */

export default server
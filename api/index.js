// https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'));

app.get("/messages", (req,res) => {
    // TODO
    console.log("/messages Not implemented")
})

app.put("/state", (req,res) => {
    // TODO
    console.log("put /state Not implemented")
})

app.get("/state", (req,res)=> {
    // TODO
    console.log("get /state Not implemented")
})

app.get("/run-log", (req,res)=> {
    // TODO
    console.log("/run-log Not implemented")
})

export default app
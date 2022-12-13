//import server from "../server.js"
//import {test, expect} from "jest"
const server =  require("../server.js");
const supertest = require("supertest")
const {test, expect} =  require("jest");

const request = supertest(server)

test("gets text response from the endpoint", async done => {
    const res = await request.get("/state")
    expect(res.status).toBe(200) 
})
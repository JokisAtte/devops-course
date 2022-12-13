import server from "../server.js"
import {test, expect} from "jest"
const request = supertest(server)

test("gets text response from the endpoint", async done => {
    const res = await request.get("/state")
    expect(res.status).toBe(200) 
    
})
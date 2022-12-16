const server =  require("../server.js");
const supertest = require("supertest")

const request = supertest(server)

describe("GET /messages endpoint tests", () => {
    it("gets text response from the endpoint", async done => {
        const res = await request.get("/messages")
        expect(res.status).toBe(200)
    })
    it("gets text response", async done => {
        const res = await request.get("/state")
        expect(res.data).toBe(String)
    })
})
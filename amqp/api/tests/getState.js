/* const server =  require("../server.js");
const supertest = require("supertest")

const request = supertest(server)
describe("GET /state endpoint tests", () => {
    it("gets status 200 response", async done => {
        const res = await request.get("/state")
        expect(res.status).toBe(200)
    })
    it("gets text response", async done => {
        const res = await request.get("/state")
        expect(res.data).toBe(String)
    })
}) */
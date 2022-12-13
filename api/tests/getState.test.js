const server =  require("../server.js");
const supertest = require("supertest")

const request = supertest(server)
describe("GET /state endpoint tests", () => {
    it("gets text response from the endpoint", async done => {
        const res = await request.get("/state")
        expect(res.status).toBe(200)
    })
})
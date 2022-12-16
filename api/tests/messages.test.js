const server =  require("../server.js");
const supertest = require("supertest")

const request = supertest()

describe("GET /messages endpoint tests", () => {
    it("status 200 and response is text", done => {
        supertest(server)
        .get("/messages")
        .expect(200)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
            err ? done(err) : done()})
    })
})
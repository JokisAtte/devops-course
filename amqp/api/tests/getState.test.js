const server =  require("../server.js");
const supertest = require("supertest")

const request = supertest(server)
describe("GET /state endpoint tests", () => {
    it("recieves status 200 and response is text", done => {
        supertest(server)
        .get("/state")
        .expect(200)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
            return err ? done(err) : done()})
    })
})
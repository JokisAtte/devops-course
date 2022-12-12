import app from "../index.js"
import supertest from "supertest"
import { expectCt } from "helmet"
import { response } from "express"

const request = supertest(app)

it("gets text response from the endpoint", async done => {
    const res = await request.get("/state")
    expect(response.status).toBe(200) 
})
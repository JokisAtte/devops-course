const server = require('../server.js')
const supertest = require('supertest')
const express = require('express')
const { response } = require('../server.js')
const request = supertest()

server.use(express.text({ type: '*/*' }))

//State starts from INIT and goes RUNNING so passing PAUSED should update the state and return ok when containers succesfully paused
describe('PUT /state', () => {
    it('Changes state', (done) => {
        const newState = 'PAUSED'
        supertest(server)
            .put('/state')
            .send(newState)
            .expect(200)
            .end((err, res) => {
                return err ? done(err) : done()
            })
    })
    it('Returns error if new state is invalid', (done) => {
        const newState = 'INVALID'
        supertest(server)
            .put('/state')
            .send(newState)
            .expect(400)
            .end((err, res) => {
                return err ? done(err) : done()
            })
    })
})

/*         supertest(server)
            .get('/state')
            .expect(200)
            .then((res) => {
                const newState = 'PAUSED'
                supertest(server).put('/state').send(newState).expect(200)
                supertest(server)
                    .get('/state')
                    .expect(200)
                    .then((res) => {
                        expect(res.text).toEqual(newState)
                    })
            }) */

/*         console.log(currentState)
        supertest(server)
        .put("/state")
        .send()
        .expect(200)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
            return err ? done(err) : done()})
    }) */

const server = require('../server.js')
const supertest = require('supertest')
const express = require('express')
const { response } = require('../server.js')
const request = supertest()

server.use(express.text({ type: '*/*' }))

//State starts from INIT and goes RUNNING so passing PAUSED should update the state and return ok when containers succesfully paused
describe('PUT /state', () => {
    it('Changes state to paused', (done) => {
        const newState = 'PAUSED'
        supertest(server)
            .put('/state')
            .send(newState)
            .expect(200)
            .end((err, res) => {
                return err ? done(err) : done()
            })
    })
    it('Changes state to shutdown', (done) => {
        const newState = 'SHUTDOWN'
        supertest(server)
            .put('/state')
            .send(newState)
            .expect(200)
            .end((err, res) => {
                return err ? done(err) : done()
            })
    })
    it('Changes state to init', (done) => {
        const newState = 'INIT'
        supertest(server)
            .put('/state')
            .send(newState)
            .expect(200)
            .end((err, res) => {
                return err ? done(err) : done()
            })
    })
    it('Changes state to running', (done) => {
        const newState = 'RUNNING'
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

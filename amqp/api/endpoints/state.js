const request = require('request')
const http = require('http')

const getState = () => {
    // TODO
    console.log('get /state Not implemented')
}

const getOrigContainerId = async () => {
    const options = {
        socketPath: '/var/run/docker.sock',
        path: 'http://localhost/containers/json?ancestor=amqp-orig',
    }

    return new Promise((resolve, reject) => {
        const callback = (res) => {
            res.setEncoding('utf8')
            res.on('data', (res) => {
                data = JSON.parse(res)
                resolve(data[0].Id)
            })
            res.on('error', (data) => reject(data))
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

const pauseContainerById = (id) => {}

const putState = async (newState) => {
    if (newState === 'INIT') {
    } else if (newState === 'PAUSED') {
        const id = await getOrigContainerId()
    } else if (newState === 'SHUTDOWN') {
    } else if (newState === 'RUNNING') {
    }
}

module.exports = { getState, putState }

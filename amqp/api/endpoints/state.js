const request = require('request')
const http = require('http')
const net = require('net')

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
                orig = data.filter((c) => c.Image === 'amqp-orig')
                console.log(orig)
                resolve(orig[0].Id)
            })
            res.on('error', (data) => reject(data))
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

async function pauseContainer(containerId) {
    console.log('Pause: ', containerId)
    const options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/${containerId}/pause`,
    }
    return new Promise((resolve, reject) => {
        const callback = (res) => {
            res.on('data', (data) => {
                const response = data.toString()
                console.log('response:', response)
                if (response.startsWith('HTTP/1.1 204')) {
                    console.log(`Container ${containerId} paused successfully`)
                    resolve()
                } else {
                    console.error(
                        `Error pausing container ${containerId}: ${response}`
                    )
                    reject(new Error(response))
                }
            })
            res.on('error', (error) => {
                console.error(
                    `Error pausing container ${containerId}: ${error}`
                )
                reject(error)
            })
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

const putState = async (newState) => {
    if (newState === 'INIT') {
    } else if (newState === 'PAUSED') {
        const id = await getOrigContainerId()
        await pauseContainer(id)
    } else if (newState === 'SHUTDOWN') {
    } else if (newState === 'RUNNING') {
    }
}

module.exports = { getState, putState }

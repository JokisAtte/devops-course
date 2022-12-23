const request = require('request')
const http = require('http')

const getState = () => {
    // TODO
    console.log('get /state Not implemented')
}

/* const getOrigContainerId = async () => {
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
                resolve(orig[0].Id)
            })
            res.on('error', (data) => reject(data))
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
} */

const getContainerId = async (imageName) => {
    const options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/json?ancestor=${imageName}`,
    }

    return new Promise((resolve, reject) => {
        const callback = (res) => {
            res.setEncoding('utf8')
            res.on('data', (res) => {
                data = JSON.parse(res)
                orig = data.filter((c) => c.Image === imageName)
                resolve(orig[0].Id)
            })
            res.on('error', (data) => reject(data))
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

const logStateChange = (newState) => {
    //TODO
}

// Returns a promise that resolves to a list [boolean, Error | undefined]
async function pauseContainer(containerId) {
    const options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/${containerId}/pause`,
        method: 'POST',
    }
    return new Promise((resolve, reject) => {
        const callback = (res) => {
            res.on('data', (data) => {
                const response = data.toString()
                console.log('response:', response)
                if (response.startsWith('HTTP/1.1 204')) {
                    console.log(`Container ${containerId} paused successfully`)
                    resolve([true, undefined])
                } else {
                    console.error(
                        `Error pausing container ${containerId}: ${response}`
                    )
                    reject([false, new Error(response)])
                }
            })
            res.on('error', (error) => {
                console.error(
                    `Error pausing container ${containerId}: ${error}`
                )
                reject([false, error])
            })
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

async function getContainerState(containerId) {
    return 'null'
}

async function getAllContainers() {
    let options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/json`,
        method: 'GET',
    }
    return new Promise((resolve, reject) => {
        const callback = (res) => {
            res.on('data', (data) => {
                const response = JSON.parse(data)
                console.log(`Get containers done`)
                resolve([true, response])
            })
            res.on('error', (error) => {
                console.error(`Error getting all containers: ${error}`)
                reject([false, error])
            })
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

async function stopOneContainer(containerId) {
    const options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/${containerId}/stop`,
        method: 'POST',
    }
    return new Promise((resolve, reject) => {
        const callback = (res) => {
            res.on('data', (data) => {
                const response = data.toString()
                console.log('response:', response)
                if (response.startsWith('HTTP/1.1 204')) {
                    console.log(`Container ${containerId} stopped successfully`)
                    resolve([true, undefined])
                } else {
                    console.error(
                        `Error stopping container ${containerId}: ${response}`
                    )
                    reject([false, new Error(response)])
                }
            })
            res.on('error', (error) => {
                console.error(
                    `Error stopping container ${containerId}: ${error}`
                )
                reject([false, error])
            })
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

// Returns a promise that resolves to a list [boolean, Error | undefined]
async function stopAllContainers() {
    const [resultAC, allContainers] = await getAllContainers()
    const excludedContainers = [
        'amqp-api',
        'gitlab/gitlab-ce:latest',
        'gitlab/gitlab-runner:alpine',
    ] //These are image names
    let allContainersStopped = true
    resultAC &&
        allContainers.forEach(async (c) => {
            if (!excludedContainers.includes(c.Image)) {
                const [result, error] = await stopOneContainer(c.Id)
                if (!result) {
                    allContainersStopped = false
                    console.log(error)
                }
            }
        })
    return allContainersStopped
}

const putState = async (newState) => {
    if (newState === 'INIT') {
        // TODO Restarttaa kaikki kontit
    } else if (newState === 'PAUSED') {
        const id = await getContainerId('amqp-orig')
        const [paused, error] = await pauseContainer(id)
        error && console.log(error)
        return paused
    } else if (newState === 'SHUTDOWN') {
        const stopped = await stopAllContainers()
        !stopped && console.log('Error with stopping all containers')
        return stopped
    } else if (newState === 'RUNNING') {
        // TODO origille kutsu että restart
        const id = await getContainerId('amqp-orig')
    }
    return false
}

module.exports = { getState, putState }

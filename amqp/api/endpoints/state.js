const http = require('http')

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

// Returns a promise that resolves to a list [boolean, Error | undefined]
async function pauseContainer(containerId) {
    const options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/${containerId}/pause`,
        method: 'POST',
    }
    return new Promise((resolve, reject) => {
        const callback = (res) => {
            if (res.statusCode == '204') {
                resolve(true)
            } else {
                reject('error')
            }
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
    // Using approach like this would cause many issues in real world
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

async function restartContainer(containerId) {
    const options = {
        socketPath: '/var/run/docker.sock',
        path: `http://localhost/containers/${containerId}/restart`,
        method: 'POST',
    }
    return new Promise((resolve, reject) => {
        const callback = (res) => {
            if (res.statusCode === 204) {
                console.log(`Container ${containerId} restarted successfully`)
                resolve([true, undefined])
            } else {
                console.error(
                    `Error restarting container ${containerId}: ${response}`
                )
                reject([false, new Error(response)])
            }
        }
        const clientRequest = http.request(options, callback)
        clientRequest.end()
    })
}

async function restartAllContainers() {
    const [resultAC, allContainers] = await getAllContainers()
    const includedContainers = [
        'amqp-httpserv',
        'amqp-imed',
        'amqp-obse',
        'amqp-orig',
    ] //These are image names
    // Rabbitmq is excluded, because i cant figure out a way to run healthchecks or anything like that with the restart
    let allContainersRestarted = true
    /*     const rabbitmq = allContainers.filter((c) => c.Image === 'amqp-rabbitmq')[0]
    console.log('Nyt rabbit')
    const RMQrestarted = await restartContainer(rabbitmq.Id) // Dont await this so code blocks
    console.log('Nyt tehty') */
    resultAC &&
        allContainers.forEach(async (c) => {
            if (includedContainers.includes(c.Image)) {
                const [result, error] = await restartContainer(c.Id)
                if (!result) {
                    allContainersRestarted = false
                    console.log(error)
                }
            }
        })
    return allContainersRestarted
}

const putState = async (newState) => {
    console.log('Begin putState')
    if (newState === 'INIT') {
        console.log('Restarting all containers')
        const restarted = await restartAllContainers()
        !restarted
            ? console.log('Error with restarting all containers')
            : console.log('Restart done')
        return restarted
    } else if (newState === 'PAUSED') {
        console.log('Pausing orig container')
        const id = await getContainerId('amqp-orig')
        const result = await pauseContainer(id)
        !result ? console.log('error') : console.log('Orig paused')
        return result
    } else if (newState === 'SHUTDOWN') {
        console.log('Shutting down all containers')
        const stopped = await stopAllContainers()
        !stopped
            ? console.log('Error with stopping all containers')
            : console.log('All containers stopped')
        return stopped
    } else if (newState === 'RUNNING') {
        console.log('Restaring orig')
        const id = await getContainerId('amqp-orig')
        const [restarted, error] = await restartContainer(id)
        !error ? console.log(error) : console.log('Orig restarted')
        return restarted
    }
    return false
}

module.exports = { putState }

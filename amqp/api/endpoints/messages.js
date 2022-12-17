const axios = require("axios")

const getMessages = async () => {
    const result = await axios.get("http://httpserv:8080")
    return result.data
}

//export default
module.exports = getMessages
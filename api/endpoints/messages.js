const axios = require("axios")

const getMessages = async () => {
    const result = await axios.get("http://localhost:8081").then((res)=>{
        return res.data
    })
    return result
}

//export default
module.exports = getMessages
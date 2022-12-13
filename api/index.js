// https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/
import server from "./server.js";
//import app from "./test"

const port = 8083

server.listen(port, () =>
console.log(`Server running on port ${port}, http://localhost:${port}`)
);
const server =  require("./server.js");

const port = 8083

server.listen(port, () =>
console.log(`Server running on port ${port}`)
);
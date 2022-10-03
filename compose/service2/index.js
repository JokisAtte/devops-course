const express = require("express");
const app = express();
const port = 9001;

app.all("/", (req, res) => {
  console.log("Service 2 start");
  const t1 = `Hello from ${req.socket.remoteAddress}:${req.socket.remotePort}`;
  const t2 =
    "Req served at " + req.client.localAddress + ":" + req.client.localPort;
  console.log(t1);
  console.log(t2);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`App 2 listening port ${port}`);
});

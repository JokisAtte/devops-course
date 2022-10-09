const express = require("express");
const app = express();
const port = 9001;

app.all("/", (req, res) => {
  const t1 = `Hello from ${req.socket.remoteAddress}:${req.socket.remotePort}`;
  const t2 =
    "Req served at " + req.client.localAddress + ":" + req.client.localPort;
  res.status(200).send(t1 + "\n" + t2);
});

app.listen(port, () => {
  console.log(`App 2 listening port ${port}`);
});

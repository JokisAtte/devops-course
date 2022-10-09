const express = require("express");
const axios = require("axios");
const app = express();
const port = 8001;

app.all("/", async (req, res) => {
  const t1 = `Hello from ${req.socket.remoteAddress}:${req.socket.remotePort}`;
  const t2 =
    "Req served at " + req.client.localAddress + ":" + req.client.localPort;
  const viesti = await axios.get("http://service2:9001").then((response) => {
    return response.data;
  });
  res.send(t1 + "\n" + t2 + "\n" + viesti);
});

app.listen(port, () => {
  console.log(`App 1 listening port ${port}`);
});

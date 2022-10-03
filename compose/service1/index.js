const express = require("express");
const request = require("request");
const app = express();
const port = 8001;

app.all("/", (req, res) => {
  console.log("Service 1 start");
  request("compose/service2://service2:9001", function (err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log(body);
    }
  });
  const t1 = `Hello from ${req.socket.remoteAddress}:${req.socket.remotePort}`;
  const t2 =
    "Req served at " + req.client.localAddress + ":" + req.client.localPort;
  console.log(t1);
  console.log(t2);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`App 1 listening port ${port}`);
});

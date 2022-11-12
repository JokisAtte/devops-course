const express = require("express");
const app = express();
const axios = require("axios");

app.all("/", async (req, res) => {
  const result = await axios.get(`http://obse:9001`).then((response) => {
    return response.data;
  });
  res.send(result);
});

app.listen(8080, () => {
  console.log(`httpserv listening port 8080`);
});

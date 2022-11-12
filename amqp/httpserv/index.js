const express = require("express");
const app = express();
const port = 9001;
const axios = require("axios");

app.all("/", async (req, res) => {
  console.log("heippa");
  const result = await axios.get(`http://obse:9001`).then((response) => {
    console.log(response);
    return response.data;
  });
  console.log(result);
  res.send(result);
});

app.listen(8080, () => {
  console.log(`httpserv listening port 8080`);
});

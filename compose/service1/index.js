const express = require("express");
const app = express();
const port = 8001;

app.get("/", (reg, res) => {
  res.send("app 1");
});

app.listen(port, () => {
  console.log(`App 1 listening port ${port}`);
});

const express = require("express");
const app = express();
const port = 8001;

app.all("/", async (req, res) => {
  res.send("Hellou, kuuntelen, tässä vastaus");
});

app.listen(port, () => {
  console.log(`App 1 listening port ${port}`);
});

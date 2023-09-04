const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("welcome");
});
app.listen("5001", () => {
  console.log("listen to port 5001");
});

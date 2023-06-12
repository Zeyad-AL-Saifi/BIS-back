const express = require("express");

const app = express();

app.listen(process.env.PORT || 4500, () => {
  console.log("Server is running , 4500");
});

module.exports = app;

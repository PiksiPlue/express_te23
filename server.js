const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from my express app! You guys are amazing!!! ❤️");
});

app.get("/about", (req, res) => {
  console.log("Haha");

  res.send("This is the about page for a really aawesome teacher!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
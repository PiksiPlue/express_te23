const { get } = require("node:http");

const express = required("express");
const app = express();

app.get("/tasks", (req,ges) => {
    res.send("Tasks side")
})
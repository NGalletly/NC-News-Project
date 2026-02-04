const express = require("express");
const app = express();

const topicsRouter = require("./routes/topicRouter");

app.use("/api/topics", topicsRouter);

module.exports = app;

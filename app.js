const express = require("express");
const app = express();

const topicsRouter = require("./routes/topicRouter");
const articlesRouter = require("./routes/articlesRouter");

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);

module.exports = app;

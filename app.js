const express = require("express");
const app = express();

const topicsRouter = require("./routes/topic.router");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/articles/:article_ids", usersRouter);

module.exports = app;

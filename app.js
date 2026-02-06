const express = require("express");
const app = express();

const topicsRouter = require("./routes/topic.router");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");
const { handleIncorrectRoute } = require("./errors/errorHandler");

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.all("/*path", handleIncorrectRoute);

module.exports = app;

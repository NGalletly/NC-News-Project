const express = require("express");
const app = express();

const topicsRouter = require("./routes/topic.router");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");
const {
  handleIncorrectRoute,
  handleBadRequest,
} = require("./errors/errorHandler");

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

//Error Handling
app.all("/*path", handleIncorrectRoute);
app.use(handleBadRequest);

module.exports = app;

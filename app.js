const express = require("express");
const app = express();

const topicsRouter = require("./routes/topic.router");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");
const {
  handleIncorrectRoute,
  handleBadRequest,
  handleCustomErrors,
  handleServerError,
} = require("./errors/errorHandler");

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

//Error Handling

//route error
app.all("/*path", handleIncorrectRoute);

// bad request
app.use(handleBadRequest);
//item doesnt exist
app.use(handleCustomErrors);
//500 handler
app.use(handleServerError);

module.exports = app;

const express = require("express");
const topicRouter = express.Router();
const { getTopics } = require("../controller/controller");

topicRouter.get("/", getTopics);

module.exports = topicRouter;

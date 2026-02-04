const express = require("express");
const articlesRouter = express.Router();
const { getArticles } = require("../controller/articles.controller");

articlesRouter.get("/", getArticles);

module.exports = articlesRouter;

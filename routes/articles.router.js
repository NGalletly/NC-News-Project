const express = require("express");
const articlesRouter = express.Router();
const {
  getArticles,
  getArticlesByID,
} = require("../controller/articles.controller");

articlesRouter.get("/:article_id", getArticlesByID);

articlesRouter.get("/", getArticles);

module.exports = articlesRouter;

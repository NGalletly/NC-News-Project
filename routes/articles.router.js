const express = require("express");
const articlesRouter = express.Router();
const {
  getArticles,
  getArticlesByID,
  getCommentsByID,
  postCommentByArticleID,
} = require("../controller/articles.controller");

articlesRouter.post("/:article_id/comments", postCommentByArticleID);

articlesRouter.get("/:article_id/comments", getCommentsByID);

articlesRouter.get("/:article_id", getArticlesByID);

articlesRouter.get("/", getArticles);

module.exports = articlesRouter;

const express = require("express");
const articlesRouter = express.Router();
const {
  getArticles,
  getArticlesByID,
  getCommentsByID,
  postCommentByArticleID,
  updateVotesForArticleByID,
} = require("../controller/articles.controller");

articlesRouter.patch("/:article_id", updateVotesForArticleByID);

articlesRouter.post("/:article_id/comments", postCommentByArticleID);

articlesRouter.get("/:article_id/comments", getCommentsByID);

articlesRouter.get("/:article_id", getArticlesByID);

articlesRouter.get("/", getArticles);

module.exports = articlesRouter;

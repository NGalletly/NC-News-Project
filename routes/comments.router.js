const express = require("express");
const commentsRouter = express.Router();
const {
  getComments,
  deleteCommentsByID,
} = require("../controller/comments.controller");

commentsRouter.delete("/:comment_id", deleteCommentsByID);
commentsRouter.get("/", getComments);

module.exports = commentsRouter;

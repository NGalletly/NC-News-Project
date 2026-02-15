const db = require("../db/connection");

exports.checkArticleExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Item doesn't exist." });
      }
    });
};

exports.checkCommentExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Item doesn't exist." });
      }
    });
};

exports.validateArticleQueries = (sort_by, order) => {
  const validSorts = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
  ];
  const validOrders = ["asc", "desc"];

  if (!validSorts.includes(sort_by) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid query" });
  } else {
    return Promise.resolve();
  }
};

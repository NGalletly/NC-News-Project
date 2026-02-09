const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query(
      `SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url,
       COUNT(comments.comment_id)::INT AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id ORDER BY articles.created_at DESC`,
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.selectCommentsByID = (article_id) => {
  return db
    .query(
      `SELECT 
     comment_id,
votes,
created_at,
author,
body,
article_id FROM comments WHERE article_id = $1`,
      [article_id],
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticlesByID = (article_id) => {
  return db
    .query(`select * from articles where article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.selectPostedComment = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, username, body],
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

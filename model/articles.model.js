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

exports.selectArticlesByID = (article_id) => {
  return db
    .query(`select * from articles where article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows[0];
    });
};

/*

author
title
article_id
topic
created_at
votes
article_img_url
comment_count
*/

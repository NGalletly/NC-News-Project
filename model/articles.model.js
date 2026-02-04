const db = require("../db/connection");

exports.selectArticles = () => {
  return db.query(`SELECT * FROM articles`).then(({ rows }) => {
    return rows;
  });
};

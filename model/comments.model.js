const db = require("../db/connection");

exports.deleteCommentsByIDModel = (comment_id) => {
  return db
    .query(`delete from comments where comment_id = $1`, [comment_id])
    .then((result) => {
      return result;
    });
};

exports.selectComments = () => {
  return db.query(`select * from comments`).then(({ rows }) => {
    return rows;
  });
};

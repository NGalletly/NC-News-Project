const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query(`select * from topics`).then(({ rows }) => {
    return rows;
  });
};

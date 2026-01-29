const db = require("../connection");

// const seed = ({ topicData, userData, articleData, commentData }) => {
//   return db.query("create table topics"); //<< write your first query in here.
// };

// const seed = aync ({ topicData, userData, articleData, commentData }) => {
//   await return db.query(`DROP TABLE IF EXISTS topics`).then(() => {
//     return db.query(`CREATE TABLE topics (slug TEXT PRIMARY KEY, description VARCHAR(), img_url VARCHAR()
//   );`);
//   });
// };

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS topics;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE topics (
          slug VARCHAR(100) PRIMARY KEY,
          description VARCHAR(200),
          img_url VARCHAR(1000)
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
          username VARCHAR(50) PRIMARY KEY,
          name VARCHAR(50),
          avatar_url VARCHAR(1000))`);
    });
};

module.exports = seed;

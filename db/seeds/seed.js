const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
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
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR(100),
          topic  VARCHAR(100) REFERENCES topics(slug),
          author VARCHAR(50) REFERENCES users(username),
          body TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)  )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id) NOT null,
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);
    })
    .then(() => {
      const formatData = topicData.map((topic) => {
        return [topic.slug, topic.description || null, topic.img_url || null];
      });
      // console.log(formatData);

      const insertData = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formatData,
      );
      return db.query(insertData);
    })
    .then(() => {
      const formatData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });

      const insertData = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        formatData,
      );

      return db.query(insertData);
    })
    .then(() => {
      const formatData = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });

      const inputData = format(
        `INSERT INTO articles (title,topic,author,body,created_at,votes,article_img_url) VALUES %L`,
        formatData,
      );
      return db.query(inputData);
    })
    .then((result) => {
      return db.query(`select article_id, title from articles`);
    })
    .then((result) => {
      const resultRows = result.rows;

      const lookupObj = {};

      resultRows.forEach((row) => {
        lookupObj[row.title] = row.article_id;
      });
      // const jimsObj = {}

      const formatData = commentData.map((comment) => {
        return [
          lookupObj[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });

      const insertData = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
        formatData,
      );

      return db.query(insertData);
    });
};

module.exports = seed;

// albumsClone.forEach((album) => {
//   let artistName = album.artist;

//   if (artistID[artistName]) {
//     album.artist = artistID[artistName];
//   }
// });
//

const db = require("../connection");
const format = require("pg-format");

const seed = function ({ topicData, userData, articleData, commentData }) {
  return (
    db
      .query(`DROP TABLE IF EXISTS comments`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS articles`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS topics`);
      })

      //
      .then(() => {
        return db.query(`CREATE TABLE topics ( 
   slug VARCHAR(50) PRIMARY KEY,
   description VARCHAR(100),
   img_url VARCHAR(1000))`);
      })
      .then(() => {
        return db.query(`CREATE TABLE users ( 
    username VARCHAR(15) PRIMARY KEY,
    name VARCHAR(50),
    avatar_url VARCHAR(1000)
    )`);
      })
      .then(() => {
        return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        topic VARCHAR REFERENCES topics(slug),
        author VARCHAR REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000))`);
      })
      .then(() => {
        return db.query(`CREATE TABLE comments (
              comment_id SERIAL PRIMARY KEY,
          article_id INT REFERENCES articles(article_id) NOT NULL,
          body TEXT,
          votes INT DEFAULT 0,
          author VARCHAR REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      })

      .then(() => {
        const formatData = topicData.map((topic) => {
          console.log([
            "topic.slug=",
            topic.slug,
            "topic.description=",
            topic.description,
            "topic.img_url=",
            topic.img_url,
          ]);
          return [topic.slug, topic.description, topic.img_url];
        });

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
          `INSERT INTO USERS (username, name, avatar_url) VALUES %L`,
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
          `INSERT INTO articles (title,topic,author,body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
          formatData,
        );

        return db.query(inputData);
      })

      .then(({ rows: insertedArticles }) => {
        const articleIdLookup = {};
        insertedArticles.forEach((article) => {
          articleIdLookup[article.title] = article.article_id;
        });

        const formatData = commentData.map((comment) => {
          return [
            articleIdLookup[comment.article_title],
            comment.body,
            comment.votes,
            comment.author,
            comment.created_at,
          ];
        });

        const inputData = format(
          `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
          formatData,
        );
        return db.query(inputData);
      })
  );
};

module.exports = seed;

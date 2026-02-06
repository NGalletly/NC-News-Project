const request = require("supertest");
const app = require("../app"); // Point to your app.js
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("status:200, responds routing is correct", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("status:200, responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /articles", () => {
  test("It should respond with a 200 status", () => {
    return request(app)
      .get("/api/articles")
      .then((body) => {
        expect(body.status).toBe(200);
      });
  });
  test("Should respond with a status of 200 and array with author, title, article_id, topic, created_at, votes, article_img_url", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        let articles = response.body;
        expect(response.status).toBe(200);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
  test("Should respond with comment_count", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        let articles = response.body;
        expect(response.status).toBe(200);

        articles.forEach((article) => {
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
  test("the articles should be sorted by date in descending order.", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        const articles = response.body;
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("Articles.body should not be included", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        let articles = response.body;
        expect(response.status).toBe(200);

        articles.forEach((article) => {
          expect(typeof article.body).toBe("undefined");
        });
      });
  });
});

describe("GET /api/users", () => {
  test("It should respond with a 200 status", () => {
    return request(app)
      .get("/api/users")
      .then((body) => {
        expect(body.status).toBe(200);
      });
  });
});

describe("GET /api/articles/:article_id with parametric id", () => {
  test("It should respond with a 200 status", () => {
    return request(app)
      .get("/api/articles/1")
      .then((body) => {
        expect(body.status).toBe(200);
      });
  });
  test("It should respond with a article_id: 4 and title : 'Student SUES Mitch'", () => {
    return request(app)
      .get("/api/articles/4")
      .then(({ body }) => {
        expect(body.articles.article_id).toBe(4);
        expect(body.articles.title).toBe("Student SUES Mitch!");
      });
  });
  test("incorrect route '/dogs' responds with 400 error code and message ", () => {
    return request(app)
      .get("/dogs")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Path doesn't exist.");
      });
  });
});

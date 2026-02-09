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
  test("incorrect type '/api/articles/dogs' responds with 400 error code and message ", () => {
    return request(app)
      .get("/api/articles/dogs")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request.");
      });
  });
  test("when given an id that doesnt exist, returns a 404 error", () => {
    return request(app)
      .get("/api/articles/7666")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Item doesn't exist.");
      });
  });
});

describe("GET /api/articles/:articleid/comments", () => {
  test("It should respond with a 200 status", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then((body) => {
        expect(body.status).toBe(200);
      });
  });
  test("It should respond with a an array with nested objects with comment_id,votes,created_at, author ,body ,article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        let comments = body.comments;
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
        });
      });
  });
});

// Task 6

describe("CORE: POST /api/articles/:article_id/comments", () => {
  test("request body accepts usename,body", () => {
    const commentBody = {
      username: "butter_bridge",
      body: "This is my first time posting a comment.",
    };
    const expectedStatus = 201;
    return request(app)
      .post("/api/articles/1/comments")
      .send(commentBody)
      .expect(201)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment.author).toBe("butter_bridge");
        expect(typeof comment.created_at).toBe("string");
        expect(typeof comment.votes).toBe("number");
        expect(comment.votes).toBe(0);
        expect(comment.article_id).toBe(1);
      });
  });
  test("if given a string for article id should return 400: bad request", () => {
    const commentBody = {
      username: "butter_bridge",
      body: "This is my first time posting a comment.",
    };
    return request(app)
      .post("/api/articles/banana/comments")
      .send(commentBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Bad request.");
      });
  });
  test("if given a article id that doesnt exist should returnshould return 404: not found", () => {
    const commentBody = {
      username: "butter_bridge",
      body: "This is my first time posting a comment.",
    };
    return request(app)
      .post("/api/articles/12039123/comments")
      .send(commentBody)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item doesn't exist.");
      });
  });
});

//Task 7
describe("CORE: PATCH /api/articles/:article_id", () => {
  test("Patch gains access to DB and returns status 200", () => {
    const addFiveVotes = { inc_votes: 5 };
    const expectedStatus = 200;
    return request(app)
      .patch("/api/articles/1")
      .send(addFiveVotes)
      .expect(expectedStatus);
  });
  test("Patch gains access to DB and updates article.votes", () => {
    const addFiveVotes = { inc_votes: 5 };
    const expectedStatus = 200;

    return request(app)
      .patch("/api/articles/1")
      .send(addFiveVotes)
      .expect(expectedStatus)
      .then(({ body }) => {
        const article = body.article;
        expect(article.votes).toBe(105);
      });
  });
  test("Patch gains access to DB and updates article.votes with subtraction", () => {
    const patchBody = { inc_votes: -5 };
    const expectedStatus = 200;
    return request(app)
      .patch("/api/articles/1")
      .send(patchBody)
      .expect(expectedStatus)
      .then(({ body }) => {
        const article = body.article;
        expect(article.votes).toBe(95);
      });
  });
});

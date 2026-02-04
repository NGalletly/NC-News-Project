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
  test("It should respond with an array of articles and a 200 status", () => {
    return request(app)
      .get("/api/articles")
      .then((body) => {
        expect(body.status).toBe(200);
      });
  });
});

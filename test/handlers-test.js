const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const Articles = require("../src/models/articles");

describe("POST /article", () => {
  it("should post a new article", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const title = "Play pool stay cool";
    const domain = "fitness";
    const author = "Qasim";
    const content = "This is the secret of my success";


    const app = createApp(users, articles, renderer);
    request(app)
      .post("/article")
      .set("content-type", "application/json")
      .send({ title, domain, author, content })
      .expect(201)
      .end(done);
  });
});

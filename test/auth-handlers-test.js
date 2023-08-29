const request = require("supertest");
const { createApp } = require("../app");
const Articles = require("../src/models/articles");
const { describe, it } = require("node:test");

describe("GET /login", () => {
  it("should redirect to home page if user is already logged in", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const app = createApp(users, articles, renderer, null);

    request(app)
      .get("/login")
      .set("cookie", "username=swag")
      .expect(302)
      .expect("location", "/")
      .end(done);
  });

  it("should redirect to page if user is not already logged in", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const app = createApp(users, articles, renderer, null);

    request(app).get("/login").expect(200).end(done);
  });
});

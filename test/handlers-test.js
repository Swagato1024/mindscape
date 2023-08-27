const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const Articles = require("../src/models/articles");

describe("POST /article", () => {
  it("should redirect unauthenticated authors to Login Page", (context, done) => {
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
      .expect(302)
      .expect("location", "/login")
      .end(done);
  });
});

describe("POST /article", () => {
  it("should post a new article from an authenticated author", (context, done) => {
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
      .set("cookie", "username=Swag")
      .set("content-type", "application/json")
      .send({ title, domain, author, content })
      .expect(201)
      .end(done);
  });
});

describe("GET /articles", () => {
  it("should serve all the aritcles", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const title = "Play pool stay cool";
    const domain = "fitness";
    const author = "Qasim";
    const content = "This is the secret of my success";

    articles.create({ title, domain, content, author });
    const app = createApp(users, articles, renderer);

    request(app)
      .get("/articles")
      .expect(200)
      .expect("content-type", /json/)
      .expect(articles.getAll())
      .end(done);
  });
});

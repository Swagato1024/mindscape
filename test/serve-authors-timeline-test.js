const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../app");
const Articles = require("../src/models/articles");

describe("GET /timeline", () => {
  it("should serve the timeline of logged in user", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const title = "Play pool stay cool";
    const domain = "fitness";
    const author = "Qasim";
    const content = "This is the secret of my success";

    const app = createApp(users, articles, renderer);

    request(app)
    .get("/timeline")
    .expect(200)
    .expect([])
    .end(done);
  });
});

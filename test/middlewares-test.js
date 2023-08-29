const request = require("supertest");
const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");
const { createApp } = require("../app");

describe("logger", () => {
  it("should log req mehtod and url", (context, done) => {
    const users = [];
    const renderer = context.mock.fn();
    const app = createApp(users, null, renderer);

    request(app)
      .get("/")
      .expect(() => {
        strictEqual(renderer.mock.callCount(), 1);
        deepStrictEqual(renderer.mock.calls[0].arguments, ["GET", "/"]);
      })
      .end(done);
  });
});

describe("POST /logout", () => {
  it("should redirect to login page for when user is not already logged in", (context, done) => {
    const users = [];
    const renderer = context.mock.fn();

    const app = createApp(users, null, renderer);

    request(app)
      .post("/logout")
      .expect("location", "/login")
      .expect(302)
      .end(done);
  });

  it("should log the user out and redirect to articles page", (context, done) => {
    const users = [];
    const renderer = context.mock.fn();

    const app = createApp(users, null, renderer);
    request(app)
      .post("/logout")
      .set("cookie", "username=swagato")
      .expect(302)
      .expect("location", "/pages/articles.html")
      .end(done);
  });
});

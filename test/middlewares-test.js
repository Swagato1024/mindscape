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

describe("POST /login", () => {
  it("should add a new user and provide a session id", (context, done) => {
    const users = [];
    const renderer = context.mock.fn();
    const emailId = "abc@gmail.com";
    const username = "Swagato";

    const app = createApp(users, null, renderer);

    request(app)
      .post("/login")
      .send({ emailId, username })
      .expect(302)
      .expect(() => {
        deepStrictEqual(users, [{ emailId, username }]);
      })
      .end(done);
  });
});

describe("POST /logout", () => {
  it("should log the user out and redirect to articles page", (context, done) => {
    const users = [];
    const renderer = context.mock.fn();

    const app = createApp(users, null, renderer);
    request(app)
      .post("/logout")
      .set("cookie", "username=swagato")
      .expect(302)
      .expect("location", "/pages/articles.html")
      .end(done)
  });
});

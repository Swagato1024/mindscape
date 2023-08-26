const request = require("supertest");
const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");
const { createApp } = require("../app");

describe("logger", () => {
  it("should log req mehtod and url", (context, done) => {
    const renderer = context.mock.fn();
    const app = createApp(renderer);

    request(app)
      .get("/")
      .expect((err, res) => {
        strictEqual(renderer.mock.callCount(), 1);
        deepStrictEqual(renderer.mock.calls[0].arguments, ["GET", "/"]);
      })
      .end(done);
  });
});

describe("POST /login", () => {
  const app = createApp(console.log);

  it("should add a new user and provide a session id", (_, done) => {
    request(app)
    .post("/login")
    .set("content-type", "application/x-www-form-urlencoded")
    .send("usrname=Swagato")
    .expect(200)
    .end(done);
  });
});

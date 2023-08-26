const request = require("supertest");
const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");
const { createApp } = require("../app");

describe("logger", () => {
  it("should log req mehtod and url", (context, done) => {
    const users = [];
    const renderer = context.mock.fn();
    const app = createApp(users, renderer);

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
  const emailId = "abc@gmail.com";
  const username = "Swagato";
  const users = [];

  const app = createApp(users, console.log);

  it("should add a new user and provide a session id", (_, done) => {
    request(app)
      .post("/login")
      .set("content-type", "application/x-www-form-urlencoded")
      .send("username=Swagato&emailId=abc@gmail.com")
      .expect(302)
      .expect((err, res) => {
        deepStrictEqual(users, [{ emailId, username }]);
      })
      .end(done);
  });
});

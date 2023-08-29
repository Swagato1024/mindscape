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



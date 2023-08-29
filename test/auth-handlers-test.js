const request = require("supertest");
const { describe, it } = require("node:test");
const {strictEqual} = require("assert");

const { createApp } = require("../app");
const Articles = require("../src/models/articles");

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

describe("POST /login", () => {
  it("should add a new user and provide a session id", (context, done) => {
    const emailId = "abc@gmail.com";
    const username = "Swagato";
    const password = "1234";
    const users = [{ username, emailId, password }];

    const renderer = context.mock.fn();

    const app = createApp(users, null, renderer);

    request(app)
      .post("/login")
      .send({ emailId, username, password })
      .expect(200)
      .end(done);
  });

  it("should send error status code when username or password does not match", (context, done) => {
    const emailId = "abc@gmail.com";
    const username = "Swagato";
    const password = "1234";
    const users = [{ username, emailId, password }];

    const renderer = context.mock.fn();

    const app = createApp(users, null, renderer);

    request(app)
      .post("/login")
      .send({ emailId, username, password: "125" })
      .expect(400)
      .end(done);
  });
});

describe("GET /signup", () => {
  it("should redirect to home page if user is already logged in", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const app = createApp(users, articles, renderer);

    request(app)
      .get("/signup")
      .set("cookie", "username=swag")
      .expect(302)
      .expect("location", "/")
      .end(done);
  });

  it("should serve signup page if user is not already logged in", (context, done) => {
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();

    const app = createApp(users, articles, renderer);

    request(app).get("/signup").expect(200).end(done);
  });
});

describe("POST /signup", () => {
  it("should register user profile", (context, done) => {
    const emailId = "abc@gmail.com";
    const username = "Swagato";
    const password = "1234";
    const users = [];
    const articles = new Articles();
    const renderer = context.mock.fn();
    const writeFile = context.mock.fn((a, b, cb) => {
      cb();
    });
    const existsSync = context.mock.fn();

    const fs = { writeFile, existsSync };

    const app = createApp(users, articles, renderer, fs);

    request(app)
      .post("/signup")
      .send({ username, emailId, password })
      .expect(() => {
        strictEqual(writeFile.mock.callCount(), 1);
        strictEqual(existsSync.mock.callCount(), 1);
      })
      .expect(201)
      .end(done);
  });
});
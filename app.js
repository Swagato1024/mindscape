const express = require("express");
const { logger, injectCookies } = require("./src/middlewares");

const {
  login,
  serveLoginPage,
  serveSignupPage,
  registerUser,
  logout,
} = require("./src/handlers/auth-handlers");

const { serveArticleForm, serveArticles, createContent, getUserProfile, serveAuthorsTimeline } = require("./src/handlers/article-handlers");

const createApp = (users, articles, renderer, fs) => {
  const app = express();

  app.use(express.urlencoded());
  app.use(express.json());
  app.use(logger(renderer));
  app.use(injectCookies);

  app.get("/login", serveLoginPage);
  app.post("/login", login(users));

  app.get("/signup", serveSignupPage);
  app.post("/signup", registerUser(users, fs));

  app.get("/user-profile", getUserProfile);

  app.get("/article-submission-form", serveArticleForm);
  app.get("/articles", serveArticles(articles));
  app.post("/article", createContent(articles, fs));

  app.get("/timeline", serveAuthorsTimeline(articles));

  app.post("/logout", logout);

  app.use(express.static("./public"));

  return app;
};

module.exports = { createApp };

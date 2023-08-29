const express = require("express");
const { logger, login, injectCookies, logout } = require("./src/middlewares");
const {
  createContent,
  serveArticles,
  getUserProfile,
  serveArticleForm,
  serveLoginPage,
  serveSignupPage,
  registerUser,
} = require("./src/handlers");
const { serveAuthorsTimeline } = require("./src/serve-authors-timeline");

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

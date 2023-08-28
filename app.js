const express = require("express");
const { logger, login, injectCookies, logout } = require("./src/middlewares");
const {
  createContent,
  serveArticles,
  getUserProfile,
  serveArticleForm,
  serveLoginPage,
} = require("./src/handlers");

const createApp = (users, articles, renderer) => {
  const app = express();

  app.use(express.json());
  app.use(logger(renderer));
  app.use(injectCookies);

  app.get("/login", serveLoginPage);
  app.post("/login", login(users));
  app.get("/user-profile", getUserProfile);

  app.get("/article-submission-form", serveArticleForm);
  app.get("/articles", serveArticles(articles));
  app.post("/article", createContent(articles));
  
  app.post("/logout", logout);

  app.use(express.static("./public"));

  return app;
};

module.exports = { createApp };

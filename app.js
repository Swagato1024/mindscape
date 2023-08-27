const express = require("express");
const { logger, registerUser, injectCookies } = require("./src/middlewares");
const { createContent, serveArticles } = require("./src/handlers");

const createApp = (users, articles, renderer) => {
  const app = express();

  app.use(express.json());
  app.use(logger(renderer));
  app.use(injectCookies);
  app.post("/login", registerUser(users));

  app.get("/articles", serveArticles(articles));

  app.post("/article", createContent(articles));

  app.use(express.static("./public"));

  return app;
};

module.exports = { createApp };

const express = require("express");
const { logger, registerUser } = require("./src/middlewares");

const createApp = (users, articles, renderer) => {
  const app = express();

  app.use(express.json());
  app.use(logger(renderer));
  app.post("/login", registerUser(users));

  app.use(express.static("./public"));

  return app;
};

module.exports = { createApp };

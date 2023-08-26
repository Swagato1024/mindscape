const express = require("express");
const { logger, registerUser } = require("./src/middlewares");

const createApp = (users, renderer) => {
  const app = express();

  app.use(logger(renderer));
  app.use(express.urlencoded());
  app.post("/login", registerUser(users));

  app.use(express.static("./public"));

  return app;
};

module.exports = { createApp };

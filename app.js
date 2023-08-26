const express = require("express");
const { logger, registerUser } = require("./src/middlewares");

const createApp = (renderer) => {
  const app = express();

  app.use(logger(renderer));
  app.use(express.urlencoded());
  app.post("/login", registerUser);
  
  app.use(express.static("./public"));

  return app;
};

module.exports = { createApp };

const fs = require("fs");
const { createApp } = require("./app");
const { load } = require("./src/loader");

const PORT = 8000;

const main = () => {
  const { users, articles } = load();
  const app = createApp(users, articles, console.log, fs);
  app.listen(PORT, () => console.log("listening on PORT"));
};

main();

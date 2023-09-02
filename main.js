const fs = require("fs");
const { createApp } = require("./app");
const { load } = require("./src/loader");

const main = () => {
  const { users, articles } = load();
  const app = createApp(users, articles, console.log, fs);

  const PORT = process.env.PORT || 8000;
  console.log(process.env.TEST);

  app.listen(PORT, () => console.log("listening on", PORT));
};

main();

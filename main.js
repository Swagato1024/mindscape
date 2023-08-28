const { createApp } = require("./app");
const { load } = require("./src/loader");

const PORT = 8000;

const main = () => {
  const { users, articles } = load();
  const app = createApp(users, articles, console.log);
  app.listen(PORT, () => console.log("listening on PORT"));
};

main();

const { createApp } = require("./app");
const Articles = require("./src/models/articles");

const PORT = 8000;

const main = () => {
  const users = [];
  const articles = new Articles();
  const app = createApp(users, articles,  console.log);
  app.listen(PORT, () => console.log("listening on PORT"));
};

main();

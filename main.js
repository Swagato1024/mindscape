const { createApp } = require("./app");

const PORT = 8000;

const main = () => {
  const users = [];
  const app = createApp(users, console.log);
  app.listen(PORT, () => console.log("listening on PORT"));
};

main();

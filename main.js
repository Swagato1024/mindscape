const { createApp } = require("./app");

const PORT = 8000;

const main = () => {
  const app = createApp(console.log);
  app.listen(PORT, () => console.log("listening on PORT"));
};

main();

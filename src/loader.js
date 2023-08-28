const fs = require("fs");
const Articles = require("./models/articles");

const loadUsers = () => {
  const users = fs.readFileSync("./storage/users.json");
  return JSON.parse(users);
};

const loadArticles = () => {
  const rawArticles = fs.readFileSync("./storage/articles.json");
  return new Articles(JSON.parse(rawArticles));
};

const load = () => {
  const users = loadUsers();
  const articles = loadArticles();

  return { users, articles };
};

module.exports = { load };

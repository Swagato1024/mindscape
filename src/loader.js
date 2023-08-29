const fs = require("fs");
const Articles = require("./models/articles");

const loadUsers = () => {
  const filepath = "./storage/users.json";

  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, "[]");
  }

  const users = fs.readFileSync(filepath);
  return JSON.parse(users);
};

const loadArticles = () => {
  const filepath = "./storage/articles.json";

  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, "[]");
  }
  
  const rawArticles = fs.readFileSync(filepath);
  return new Articles(JSON.parse(rawArticles));
};

const load = () => {
  const users = loadUsers();
  const articles = loadArticles();

  return { users, articles };
};

module.exports = { load };

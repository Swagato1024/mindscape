const createContent = (articles) => {
  return (req, res) => {
    if (!req.cookies.username) {
      res.redirect(302, "/login");
      return;
    }

    const { title, domain, content, author } = req.body;
    console.log(title, domain, content, author);
    articles.create({ title, domain, content, author });
    res.status(201).end();
  };
};

const serveArticles = (articles) => {
  return (req, res) => {
    res.status(200);
    res.json(articles.getAll());
  };
};

const isLoggedIn = (cookies) => "username" in cookies;

const getUserProfile = (req, res) => {
  const { cookies } = req;

  if (!isLoggedIn(cookies)) {
    res.json({ loggedIn: false });
    return;
  }

  res.json({ loggedIn: true, username: cookies.username });
};

const serveArticleForm = (req, res) => {
  if (!isLoggedIn(req.cookies)) return res.redirect("/login");

  const filepath = `${process.env.PWD}/public/pages/article-form.html`;
  res.sendFile(filepath);
};

const serveLoginPage = (req, res) => {
  if (isLoggedIn(req.cookies)) return res.redirect("/");

  const filepath = `${process.env.PWD}/public/pages/login-form.html`;
  res.sendFile(filepath);
};

const serveSelectedArticles = (articles) => {
  return (req, res) => {
    const username = req.cookies?.username;
    if (!username) {
      req.redirect("/login");
      return;
    }

    const selectedArticles = articles.selecByAuthor(username);
    res.json(selectedArticles);
  };
};

module.exports = {
  createContent,
  serveArticles,
  getUserProfile,
  serveArticleForm,
  serveLoginPage,
  serveSelectedArticles,
};

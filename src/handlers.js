const createContent = (articles) => {
  return (req, res) => {
    if (!req.cookies.username) {
      res.redirect(302, "/login");
      return;
    }

    const { title, domain, content, author } = req.body;
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

module.exports = { createContent, serveArticles, getUserProfile };

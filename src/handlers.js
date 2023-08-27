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

module.exports = { createContent, serveArticles };

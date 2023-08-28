const createContent = (articles) => {
  return (req, res) => {
    if (!req.cookies.username) {
      res.redirect(302, "/login");
      return;
    }

    const author = req.cookies.username;
    const { title, domain, content } = req.body;
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

const serveArticleForm = (req, res, next) => {
  if (!isLoggedIn(req.cookies)) return res.redirect("/login");

  req.url = "/pages/article-form.html";
  next();
};

const serveLoginPage = (req, res, next) => {
  if (isLoggedIn(req.cookies)) return res.redirect("/");

  req.url = "/pages/login.html";
  next();
};

const serveSignupPage = (req, res, next) => {
  if (isLoggedIn(req.cookies)) return res.redirect("/");
  req.url = "/pages/register.html";
  next();
};

const registerUser = (users) => {
  return (req, res) => {
    if (isLoggedIn(req.cookies)) return res.redirect("/");

    const { emailId, username, password } = req.body;
    users.push({ emailId, username, password });

    res.cookie("username", username);
    res.status(201).end();
  };
};

module.exports = {
  createContent,
  serveArticles,
  getUserProfile,
  serveArticleForm,
  serveLoginPage,
  serveSignupPage,
  registerUser,
};

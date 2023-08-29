const isLoggedIn = (cookies) => "username" in cookies;

const serveLoginPage = (req, res, next) => {
  if (isLoggedIn(req.cookies)) return res.redirect("/");

  req.url = "/pages/login.html";
  next();
};

module.exports = { serveLoginPage };

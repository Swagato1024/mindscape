const logger = (renderer) => {
  return (req, res, next) => {
    renderer(req.method, req.url);
    next();
  };
};

const parseCookies = (cookiesString) => {
  const cookies = {};

  if (!cookiesString) {
    return cookies;
  }

  cookiesString.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookies[name.trim()] = value.trim();
  });
  return cookies;
};

const injectCookies = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  req.cookies = cookies;
  next();
};

const logout = (req, res) => {
  if (!req.cookies.username) {
    res.redirect("/login");
    return;
  }

  res.clearCookie("username");
  res.redirect(302, "/pages/articles.html");
};

module.exports = { logger, injectCookies, logout };

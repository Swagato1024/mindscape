const logger = (renderer) => {
  return (req, res, next) => {
    renderer(req.method, req.url);
    next();
  };
};

const isPasswordMatched = (users, usrnameToFind, password) => {
  const currentUser = users.find(({ username }) => username === usrnameToFind);
  return currentUser.password === password;
};

const login = (users) => {
  return (req, res) => {
    const { username: currentuser, password } = req.body;

    const isValidUser = users.some(({ username }) => username === currentuser);
    let isCorrectPassword = false;

    if (isValidUser) {
      isCorrectPassword = isPasswordMatched(users, currentuser, password);
    }

    if (isValidUser && isCorrectPassword) {
      res.cookie("username", currentuser);
      res.status(200).send({ isValidUser, isCorrectPassword, location: "/" });
      return;
    }

    res.status(400);
    res.json({ isValidUser, isCorrectPassword });
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

module.exports = { logger, login, injectCookies, logout };

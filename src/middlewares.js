const logger = (renderer) => {
  return (req, res, next) => {
    renderer(req.method, req.url);
    next();
  };
};

const registerUser = (users) => {
  return (req, res) => {
    const { emailId, username } = req.body;

    users.push({ emailId, username });
    res.cookie("usr_name", username);
    res.redirect(302, "/");
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


module.exports = { logger, registerUser, injectCookies};

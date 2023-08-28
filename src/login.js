const isUserValid = (users, name) =>
  users.some(({ username }) => username === name);

const login = (users) => {
  return (req, res, next) => {
    const { username } = req.body;

    if (username) {
      if (!isUserValid(users, username)) {
        res.redirect(302, "/register");
        return;
      }
      const sessionId = req.sessions.add(username);
      res.cookie("sessionId", sessionId);
      res.redirect(302, "/");
      return;
    }

    req.url = "/pages/login.html";
    next();
  };
};

module.exports = { login };

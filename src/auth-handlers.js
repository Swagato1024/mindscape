const isLoggedIn = (cookies) => "username" in cookies;

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

const registerUser = (users, fs) => {
  return (req, res) => {
    if (isLoggedIn(req.cookies)) return res.redirect("/");

    const { emailId, username, password } = req.body;
    users.push({ emailId, username, password });

    console.log(fs.existsSync("./storage/users.json"));

    fs.writeFile("./storage/users.json", JSON.stringify(users), () => {
      res.cookie("username", username);
      res.status(201).end();
    });
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

const logout = (req, res) => {
  if (!req.cookies.username) {
    res.redirect("/login");
    return;
  }

  res.clearCookie("username");
  res.redirect(302, "/");
};

module.exports = {
  serveLoginPage,
  serveSignupPage,
  registerUser,
  login,
  logout,
};

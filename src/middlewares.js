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
    res.cookie("usr_session", 5);
    res.cookie("usr_name", username);
    res.redirect(302, "/");
  };
};

module.exports = { logger, registerUser };

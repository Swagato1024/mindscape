const logger = (renderer) => {
  return (req, res, next) => {
    renderer(req.method, req.url);
    next();
  };
};

const registerUser = (req, res) => {
  res.cookie("usr_session", 5);
  res.status(200).end();
};

module.exports = { logger, registerUser };

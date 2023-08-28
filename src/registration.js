const isUserValid = (users, name) =>
  users.some(({ username }) => username === name);

const login = (users) => (req, res) => {
  const { emailId, username } = req.body;

  if (!username) {
    res.statusCode = 400;
    res.end("Provide username");
    return;
  }

  if (isUserValid(users, username)) {
    res.statusCode = 400;
    res.send("Username already exists");
    return;
  }

  users.push({ emailId, username });
  res.send("Registered successfully");
};

module.exports = { login };

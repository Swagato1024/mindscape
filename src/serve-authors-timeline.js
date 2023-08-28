const serveAuthorsTimeline = (articles) => {
  return (req, res) => {
    const { username: author } = req.cookies;
    const authorsTimeLine = articles.selectByAuthor(author);

    res.json(authorsTimeLine);
  };
};

module.exports = { serveAuthorsTimeline };

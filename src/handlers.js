const createContent = (articles) => {
  return (req, res) => {
    const { title, domain, content, author } = req.body;
    articles.create({ title, domain, content, author });
    res.status(201).end();
  };
};

module.exports = { createContent };

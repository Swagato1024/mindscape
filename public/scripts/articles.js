

// {title: 'dfs', domain: 'dsaf', content: 'dsfds', author: 'rg', articleId: 'aritcle-5'}

const createArticleElement = ({ title, content, author }) => {
  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article-card");
  const titleElement = document.createElement("h3");
  titleElement.innerText = title;

  const authorElement = document.createElement("p");
  authorElement.innerText = author;

  const articleBody = document.createElement("div");
  articleBody.innerText = content;

  articleContainer.append(title, author, articleBody);

  return articleContainer;
};

const render = (articles, articlesContainer) => {
  const articleElements = articles.map(createArticleElement);

  articlesContainer.append(...articleElements);
};

const fetchAndShowArticles = () => {
  const articlesContainer = document.querySelector(".article-list");

  fetch("/articles")
    .then((res) => res.json())
    .then((articles) => render(articles, articlesContainer));
};

window.onload = fetchAndShowArticles;

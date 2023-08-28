{
  /* <div class="article">
<h2>Article Title</h2>
<p>Article Content...</p>
<div class="options">
    <a href="#" class="btn-edit">Edit</a>
    <a href="#" class="btn-delete">Delete</a>
</div>
</div> */
}

const createBtn = (href, value, className) => {
  const btn = document.createElement("input");
  btn.setAttribute("type", "button");
  btn.value = value;

  btn.onclick = () => {};

  const link = document.createElement("input");
  link.href = href;
  link.innerText = value;
  link.classList.add(className);

  return link;
};

const createOptions = (articleId) => {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");

  const editLink = createBtn("timeline", "Edit", "btn-edit");
  const deleteLink = createBtn("timeline", "Delete", "btn-delete");

  optionsContainer.append(editLink, deleteLink);
  return optionsContainer;
};

const createArticleElement = ({ title, articleId, content }) => {
  const titleElement = document.createElement("h2");
  const articleContent = document.createElement("p");
  articleContent.innerText = content;
  titleElement.innerText = title;

  const options = createOptions(articleId);

  const articleElement = document.createElement("div");
  articleElement.classList.add("article");

  articleElement.append(titleElement, articleContent, options);
  articleElement.append(options);

  console.log(articleElement);

  return articleElement;
};

const render = (articles, articlesContainer) => {
  console.log(articles);

  const articleElements = articles.map(createArticleElement);
  articlesContainer.append(...articleElements);
};

const fetchAndRenderTimeLine = () => {
  const articlesContainer = document.querySelector(".article-list");

  fetch("/timeline")
    .then((res) => res.json())
    .then((articles) => render(articles, articlesContainer));
};

window.onload = fetchAndRenderTimeLine;

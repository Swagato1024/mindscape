class Articles {
  #count;
  #articles;

  constructor(articles = [], count = 0) {
    this.#articles = articles;
    this.#count = count;
  }

  create(aritcleSpecifics) {
    this.#count++;
    const articleId = `aritcle-${this.#count}`;
    this.#articles.push({ ...aritcleSpecifics, articleId });
  }

  selectByAuthor(authorname) {
    return this.#articles.filter(({ author }) => author === authorname);
  }

  getAll() {
    return [...this.#articles];
  }
}

module.exports = Articles;

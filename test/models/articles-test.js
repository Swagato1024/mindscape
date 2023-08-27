const { describe, it } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");
const Articles = require("../../src/models/articles");

describe("Articles", () => {
  it("should create an aricle by giving it an id", () => {
    const author = "Qasim";
    const title = "Play pool stay cool";
    const content = "Enjoy";
    const domain = "fitness";
    const articleId = "aritcle-1";

    const aritcleSpecifics = { author, title, content, domain };
    const articles = new Articles();
    articles.create(aritcleSpecifics);

    deepStrictEqual(articles.getAll(), [{ ...aritcleSpecifics, articleId }]);
  });
});

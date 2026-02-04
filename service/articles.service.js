const { selectArticles } = require("../model/articles.model");

exports.fetchArticles = () => {
  return selectArticles();
};

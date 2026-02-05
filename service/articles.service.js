const {
  selectArticles,
  selectArticlesByID,
} = require("../model/articles.model");

exports.fetchArticles = () => {
  return selectArticles();
};

exports.fetchArticlesByID = (article_id) => {
  return selectArticlesByID(article_id);
};

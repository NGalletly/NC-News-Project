const {
  selectArticles,
  selectArticlesByID,
} = require("../model/articles.model");

exports.fetchArticles = () => {
  return selectArticles();
};

exports.fetchArticlesByID = (article_id) => {
  return selectArticlesByID(article_id).then((article) => {
    if (!article) {
      throw { status: 404, message: "Item doesn't exist." };
    } else {
      return article;
    }
  });
};

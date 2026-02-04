const { fetchArticles } = require("../service/articles.service");

exports.getArticles = (request, response) => {
  fetchArticles().then((articles) => {
    console.log(articles);
    response.status(200).send(articles);
  });
};

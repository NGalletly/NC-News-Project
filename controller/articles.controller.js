const {
  fetchArticles,
  fetchArticlesByID,
} = require("../service/articles.service");

exports.getArticles = (request, response) => {
  fetchArticles().then((articles) => {
    // console.log(articles);
    response.status(200).send(articles);
  });
};

exports.getArticlesByID = (request, response) => {
  const { article_id } = request.params;
  fetchArticlesByID(article_id).then((articles) => {
    {
      // console.log(articles);
      response.status(200).send({ articles });
    }
  });
};

// exports.getArticlesByID = (request, response, next) => {
//   const { article_id } = request.params;
//   fetchArticlesByID(article_id)
//     .then((article) => {
//       response.status(200).send({ article });
//     })
//     .catch(next);
// };

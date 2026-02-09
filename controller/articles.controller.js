const {
  fetchArticles,
  fetchArticlesByID,
  fetchCommentsByID,
  postAndFetchComment,
} = require("../service/articles.service");

exports.postCommentByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  const postComment = request.body;
  postAndFetchComment(article_id, postComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};

exports.getArticles = (request, response) => {
  fetchArticles().then((articles) => {
    // console.log(articles);
    response.status(200).send(articles);
  });
};

exports.getArticlesByID = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticlesByID(article_id)
    .then((articles) => {
      {
        // console.log(articles);
        response.status(200).send({ articles });
      }
    })
    .catch(next);
};


exports.getCommentsByID = (request, response, next) => {
  const { article_id } = request.params;

  // if (typeof article_id !== "number") {
  //   throw err;
  // }.catch(next);

  fetchCommentsByID(article_id)
    .then((comments) => {
      {
        response.status(200).send({ comments });
      }
    })
    .catch(next);
};

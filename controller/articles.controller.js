const {
  fetchArticles,
  fetchArticlesByID,
  fetchCommentsByID,
  postAndFetchComment,
  serviceUpdateVotes,
} = require("../service/articles.service");

exports.updateVotesForArticleByID = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  serviceUpdateVotes(article_id, inc_votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};

exports.postCommentByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  const postComment = request.body;
  postAndFetchComment(article_id, postComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};

exports.getArticles = (request, response, next) => {
  const { sort_by, order_by, topic } = request.query;
  fetchArticles(sort_by, order_by, topic)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err);
      next(err);
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

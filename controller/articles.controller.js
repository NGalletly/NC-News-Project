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

  if (inc_votes === undefined) {
    return response
      .status(400)
      .send({ msg: "Missing or incorrect request body" });
  }
  serviceUpdateVotes(article_id, inc_votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};

exports.postCommentByArticleID = (request, response, next) => {
  const { article_id } = request.params;
  const postComment = request.body;

  if (!postComment.username || !postComment.body) {
    return response
      .status(400)
      .send({ msg: "Error, missing either username and/or body" });
  }

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
      response.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByID = (request, response, next) => {
  const { article_id } = request.params;
  fetchCommentsByID(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};

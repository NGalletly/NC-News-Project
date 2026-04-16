const {
  fetchComments,
  deleteCommentsByIDService,
} = require("../service/comments.service.js");

exports.getComments = (request, response, next) => {
  fetchComments()
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};

exports.deleteCommentsByID = (request, response, next) => {
  const { comment_id } = request.params;
  deleteCommentsByIDService(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch(next);
};

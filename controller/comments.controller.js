const {
  fetchComments,
  deleteCommentsByIDService,
} = require("../service/comments.service.js");

exports.getComments = (request, response) => {
  fetchComments()
    .then((comments) => {
      //   console.log(comments);
      response.status(200).send({ comments });
    })
    .catch((err) => {
      if (err.code === "22P02") {
        response.status(400).send({ message: "Bad Request." });
      }
    });
};

exports.deleteCommentsByID = (request, response, next) => {
  const { comment_id } = request.params;
  deleteCommentsByIDService(comment_id)
    .then(() => {
      {
        response.status(204).send();
      }
    })
    .catch(next);
};

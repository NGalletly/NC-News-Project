const {
  selectComments,
  deleteCommentsByIDModel,
} = require("../model/comments.model");
const { checkCommentExists } = require("../model/doesParametricEndpointExist");

exports.deleteCommentsByIDService = (comment_id) => {
  return checkCommentExists(comment_id).then(() => {
    return deleteCommentsByIDModel(comment_id).then((comment) => {
      return comment;
    });
  });
};

exports.fetchComments = () => {
  return selectComments();
};

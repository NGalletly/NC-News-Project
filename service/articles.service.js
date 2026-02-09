const {
  selectArticles,
  selectArticlesByID,
  selectCommentsByID,
  selectPostedComment,
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

exports.fetchCommentsByID = (article_id) => {
  return selectCommentsByID(article_id).then((comments) => {
    if (comments.length === 0) {
      throw { status: 404, message: "Item doesn't exist." };
    } else {
      return comments;
    }
  });
};

exports.postAndFetchComment = (article_id, postComment) => {
  return selectPostedComment(
    article_id,
    postComment.username,
    postComment.body,
  ).then((comment) => {
    if (!comment) {
      throw { status: 404, message: "Post doesn't exist." };
    } else {
      return comment;
    }
  });
};

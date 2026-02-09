const {
  selectArticles,
  selectArticlesByID,
  selectCommentsByID,
  selectPostedComment,
  selectArticleAlterVotes,
} = require("../model/articles.model");

const { checkArticleExists } = require("../model/doesArticleExist");

exports.fetchArticles = () => {
  return selectArticles();
};

exports.fetchArticlesByID = (article_id) => {
  return checkArticleExists(article_id).then(() => {
    return selectArticlesByID(article_id).then((article) => {
      return article;
    });
  });
};

exports.fetchCommentsByID = (article_id) => {
  return checkArticleExists(article_id).then(() => {
    return selectCommentsByID(article_id).then((comments) => {
      return comments;
    });
  });
};

exports.postAndFetchComment = (article_id, postComment) => {
  return checkArticleExists(article_id).then(() => {
    return selectPostedComment(
      article_id,
      postComment.username,
      postComment.body,
    ).then((comment) => {
      return comment;
    });
  });
};

exports.serviceUpdateVotes = (article_id, inc_votes) => {
  return checkArticleExists(article_id).then(() => {
    return selectArticleAlterVotes(article_id, inc_votes).then((article) => {
      return article;
    });
  });
};

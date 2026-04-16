const { selectTopics } = require("../model/model");

exports.fetchTopics = () => {
  return selectTopics();
};

const { fetchTopics } = require("../service/topics.service.js");

exports.getTopics = (request, response) => {
  fetchTopics().then((topics) => {
    // console.log(topics);
    response.status(200).send({ topics: topics });
  });
};

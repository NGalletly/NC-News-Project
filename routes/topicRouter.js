// associate a url with a function
// handle invalid routes(errors will come tomorrow)

// const express = require('express');
// const router express.Router(); "/snacks/:snacksid" will be handled by this class

// router.get("/"), (req,res)=>{

// }

const express = require("express");
const topicRouter = express.Router();

topicRouter.get("/", (request, response) => {
  response.status(200).send({ message: "topic route successful!" });
});

module.exports = topicRouter;

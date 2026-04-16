const express = require("express");
const usersRouter = express();
const { getUsers } = require("../controller/users.controller");

usersRouter.get("/", getUsers);

module.exports = usersRouter;

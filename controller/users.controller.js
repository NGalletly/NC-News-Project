const { fetchUsers } = require("../service/users.service.js");

exports.getUsers = (req, res) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

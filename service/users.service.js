const { selectUsers } = require("../model/users.model");

exports.fetchUsers = () => {
  return selectUsers();
};

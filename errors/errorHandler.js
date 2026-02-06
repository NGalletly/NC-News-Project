exports.handleIncorrectRoute = (req, res) => {
  res.status(404).send({message: "Path doesn't exist."})
};

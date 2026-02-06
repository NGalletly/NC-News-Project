exports.handleIncorrectRoute = (req, res) => {
  res.status(404).send({ message: "Path doesn't exist." });
};

exports.handleBadRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request." });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ msg: err.message });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request." });
  } else {
    next(err);
  }
};

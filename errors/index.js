exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    "42703": "Bad Request",
    "22P02": "Bad Request"
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  const codes = {
    "23503": "Article does not exist"
  };
  if (codes[err.code]) res.status(404).send({ msg: codes[err.code] });
  else if (err.code === 404) res.status(404).send({ msg: err.msg });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

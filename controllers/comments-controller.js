const { updateComment, removeComment } = require("../models/commentsModel");

const patchComment = (req, res, next) => {
  const { params, body } = req;
  updateComment(params, body)
    .then(updatedComment => {
      res.status(200).send(updatedComment);
    })
    .catch(next);
};

const deleteComment = (req, res, next) => {
  removeComment(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = { patchComment, deleteComment };

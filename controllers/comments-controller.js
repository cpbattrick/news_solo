const { updateComment, removeComment } = require("../models/commentsModel");

const patchComment = (req, res, next) => {
  const { params, body } = req;
  updateComment(params, body)
    .then(updatedComment => {
      const comment = updatedComment[0];
      if (!updatedComment.length)
        return Promise.reject({ code: 404, msg: "Comment does not exist" });
      else res.status(200).send({ comment });
    })
    .catch(next);
};

const deleteComment = (req, res, next) => {
  removeComment(req.params)
    .then(comment => {
      if (!comment.length)
        return Promise.reject({ code: 404, msg: "Comment does not exist" });
      else res.status(204).send();
    })
    .catch(next);
};

module.exports = { patchComment, deleteComment };

const commentsRouter = require("express").Router();
const {
  patchComment,
  deleteComment
} = require("../controllers/comments-controller");
const { methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;

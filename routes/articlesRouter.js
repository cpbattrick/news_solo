const articlesRouter = require("express").Router();
const {
  deleteArticle,
  postNewArticle,
  postNewComment,
  getAllArticles,
  getArticleById,
  patchArticle,
  getCommentsByArticleId
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .post(postNewArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postNewComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;

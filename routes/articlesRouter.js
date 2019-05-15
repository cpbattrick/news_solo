const articlesRouter = require("express").Router();
const {
  postNewComment,
  getAllArticles,
  getArticleById,
  patchArticle,
  getCommentsByArticleId
} = require("../controllers/articles-controller");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postNewComment);

module.exports = articlesRouter;

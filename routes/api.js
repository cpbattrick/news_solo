const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const topicsRouter = require("./topicsRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const usersRouter = require("./usersRouter");

apiRouter
  .route("/")
  .get((req, res) =>
    res.send({
      endpoints: [
        "/topics",
        "/articles",
        "/comments",
        "/users/:username",
        "/articles/article_id",
        "/articles/article_id/comments",
        "/comments/:comment_id"
      ]
    })
  )
  .all(methodNotAllowed);

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;

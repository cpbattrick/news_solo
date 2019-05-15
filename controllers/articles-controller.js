const {
  addNewComment,
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  fetchCommentsByArticleId
} = require("../models/articlesModel");

const getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      if (!article.length)
        return Promise.reject({ code: 404, msg: "Article does not exist" });
      else res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const patchArticle = (req, res, next) => {
  const { params, body } = req;
  updateArticle(params, body)
    .then(updatedArticle => {
      res.status(200).send(updatedArticle);
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const alteredComment = { ...req.body };
  alteredComment.article_id = article_id;
  alteredComment.author = req.body.username;
  delete alteredComment.username;
  addNewComment(alteredComment)
    .then(newComment => {
      res.status(201).send(newComment);
    })
    .catch(next);
};

module.exports = {
  postNewComment,
  getAllArticles,
  getArticleById,
  patchArticle,
  getCommentsByArticleId
};

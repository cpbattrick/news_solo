const {
  removeArticle,
  addNewArticle,
  fetchArticleCount,
  articleCheck,
  addNewComment,
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  fetchCommentsByArticleId
} = require("../models/articlesModel");

const getAllArticles = (req, res, next) => {
  Promise.all([fetchArticleCount(req.query), fetchAllArticles(req.query)])
    .then(values => {
      const articles = {};
      articles.total_count = +values[0][0].count;
      articles.articles = values[1];
      if (!values[1].length)
        return Promise.reject({ code: 404, msg: "Bad query" });
      else res.status(200).send(articles);
    })
    .catch(err => {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(articleArray => {
      const article = articleArray[0];
      if (!articleArray.length)
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
    .then(updatedArticleArray => {
      const updatedArticle = updatedArticleArray[0];
      if (!updatedArticleArray.length)
        return Promise.reject({ code: 404, msg: "Article does not exist" });
      else res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([articleCheck(article_id)])
    .then(([article]) => {
      if (!article.length)
        return Promise.reject({ code: 404, msg: "Article does not exist" });
      else return fetchCommentsByArticleId(article_id, req.query);
    })
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
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const postNewArticle = (req, res, next) => {
  addNewArticle(req.body)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  removeArticle(req.params)
    .then(article => {
      if (!article.length)
        return Promise.reject({ code: 404, msg: "Article does not exist" });
      else res.status(204).send();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  deleteArticle,
  postNewArticle,
  postNewComment,
  getAllArticles,
  getArticleById,
  patchArticle,
  getCommentsByArticleId
};

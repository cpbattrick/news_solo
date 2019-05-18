const {
  articleCheck,
  addNewComment,
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  fetchCommentsByArticleId
} = require("../models/articlesModel");

const getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      console.log(articles);
      if (!articles.length)
        return Promise.reject({ code: 404, msg: "Bad query" });
      else res.status(200).send({ articles });
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

  // fetchCommentsByArticleId(article_id, req.query)
  //   .then(comments => {
  //     res.status(200).send({ comments });
  //   })
  //   .catch(next);
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

module.exports = {
  postNewComment,
  getAllArticles,
  getArticleById,
  patchArticle,
  getCommentsByArticleId
};

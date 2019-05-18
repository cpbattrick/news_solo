const connection = require("../db/connection");

const fetchAllArticles = ({ sort_by, order, username, topic }) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (username) query.where("articles.author", username);
      if (topic) query.where("articles.topic", topic);
    });
};

const fetchArticleById = article_id => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id);
};

const updateArticle = (id, newValue) => {
  return connection("articles")
    .where("article_id", "=", id.article_id)
    .increment("votes", newValue.inc_votes)
    .returning("*");
};

const fetchCommentsByArticleId = (id, { sort_by, order }) => {
  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("article_id", "=", id)
    .orderBy(sort_by || "created_at", order || "desc");
};

const addNewComment = newComment => {
  return connection("comments")
    .insert(newComment)
    .returning("*");
};

module.exports = {
  addNewComment,
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  fetchCommentsByArticleId
};

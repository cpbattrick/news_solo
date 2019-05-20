const connection = require("../db/connection");

const fetchAllArticles = ({ sort_by, order, username, topic, limit, p }) => {
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
    .limit(limit || 10)
    .offset((p - 1) * (limit || 10))
    .modify(query => {
      if (username) query.where("articles.author", username);
      if (topic) query.where("articles.topic", topic);
    });
};

const fetchArticleCount = () => {
  return connection("articles").count();
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

const fetchCommentsByArticleId = (id, { sort_by, order, limit, p }) => {
  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("article_id", "=", id)
    .orderBy(sort_by || "created_at", order || "desc")
    .limit(limit || 10)
    .offset((p - 1) * (limit || 10));
};

const addNewComment = newComment => {
  return connection("comments")
    .insert(newComment)
    .returning("*");
};

const articleCheck = id => {
  return connection("articles")
    .select("*")
    .where("article_id", "=", id);
};

module.exports = {
  fetchArticleCount,
  articleCheck,
  addNewComment,
  fetchAllArticles,
  fetchArticleById,
  updateArticle,
  fetchCommentsByArticleId
};

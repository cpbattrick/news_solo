const {
  articlesData,
  commentsData,
  usersData,
  topicsData
} = require("../data");

const { createRef, renameKeys } = require("../../utils/seeding-functions");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicsData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(usersData)
        .returning("*");
    })
    .then(() => {
      const newArticles = articlesData.map(article => {
        article.created_at = new Date(article.created_at);
        return article;
      });
      return knex("articles")
        .insert(newArticles)
        .returning("*");
    })
    .then(articleRows => {
      const ref = createRef(articleRows, "title", "article_id");
      const newComments = renameKeys(commentsData, "created_by", "author");
      newCommments = newComments.map(comment => {
        comment.created_at = new Date(comment.created_at);
        comment.article_id = ref[comment.belongs_to];
        delete comment.belongs_to;
        return comment;
      });
      return knex("comments")
        .insert(newComments)
        .returning("*");
    });
};

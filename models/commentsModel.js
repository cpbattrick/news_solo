const connection = require("../db/connection");

const updateComment = (id, newValue) => {
  return connection("comments")
    .where("comment_id", "=", id.comment_id)
    .increment("votes", newValue.inc_votes)
    .returning("*");
};

const removeComment = id => {
  return connection("comments")
    .where("comment_id", "=", id.comment_id)
    .del()
    .returning("*");
};

module.exports = { updateComment, removeComment };

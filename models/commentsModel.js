const connection = require("../db/connection");

const updateComment = (id, newValue) => {
  return connection("comments")
    .where("comment_id", "=", id.comment_id)
    .increment("votes", newValue.inc_vote)
    .returning("*");
};

const removeComment = id => {
  return connection("comments")
    .where("comment_id", "=", id.comment_id)
    .del();
};

module.exports = { updateComment, removeComment };

exports.up = function(knex, Promise) {
  console.log("Creating comments table...");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.date("created_at").defaultTo(knex.fn.now());
    commentsTable.string("body", 9999).notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments table...");
  return knex.schema.dropTable("comments");
};

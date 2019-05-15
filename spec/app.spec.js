process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const supertest = require("supertest");
const connection = require("../db/connection");
const app = require("../app");
const request = supertest(app);

chai.use(chaiSorted);

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe("The Topics endpoint - /api/topics", () => {
    describe("GET request", () => {
      describe("Status 200 - OK", () => {
        it("/ - responds with all topics", () => {
          return request
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body.topics).to.be.an("array");
            });
        });
      });
    });
  });

  describe("The Articles endpoint - /api/articles", () => {
    describe("GET request", () => {
      describe("Status 200 - OK", () => {
        it("/ - responds with all articles", () => {
          return request
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.an("array");
            });
        });

        it("/ - should return articles ordered by date (desc) by default", () => {
          return request
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.descendingBy("created_at");
            });
        });

        it("/ - should return articles ordered by date (asc) when passed an order query", () => {
          return request
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.ascendingBy("created_at");
            });
        });

        it("/ - should return articles ordered by article_id (desc) when passed a sort_by query", () => {
          return request
            .get("/api/articles?sort_by=article_id")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.ascendingBy("created_at");
            });
        });

        it("/ - should return articles filtered by author when passed a username query", () => {
          return request
            .get("/api/articles?username=butter_bridge")
            .expect(200)
            .then(({ body }) => {
              body.articles.forEach(article => {
                expect(article.author).to.equal("butter_bridge");
              });
            });
        });

        it("/ - should return articles filtered by topic when passed a topic query", () => {
          return request
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then(({ body }) => {
              body.articles.forEach(article => {
                expect(article.topic).to.equal("mitch");
              });
            });
        });

        it("/:article_id - responds with the article with provided id", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article[0].article_id).to.equal(1);
            });
        });

        it("/:article_id/comments - an array of comments for the given article_id", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0].comment_id).to.equal(2);
            });
        });

        it("/:article_id/comments - an array of comments ordered by 'created_at' (desc) by default", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.descendingBy("created_at");
            });
        });

        it("/:article_id/comments - an array of comments sorted by given query", () => {
          return request
            .get("/api/articles/1/comments?sort_by=comment_id")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.descendingBy("comment_id");
            });
        });

        it("/:article_id/comments - an array of comments ordered by given query", () => {
          return request
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.ascendingBy("created_at");
            });
        });
      });
    });

    describe("Patch Request", () => {
      describe("Status 200 - OK", () => {
        it("/api/articles/:article_id Updates an article in the database when given an article id", () => {
          const inc_vote = 10;
          const newVote = { inc_vote };
          return request
            .patch("/api/articles/1/")
            .send(newVote)
            .expect(200)
            .then(({ body }) => {
              expect(body[0].votes).to.equal(110);
            });
        });

        it("/api/comments/:comment_id Updates a comment in the database when given a comment id", () => {
          const inc_vote = 10;
          const newVote = { inc_vote };
          return request
            .patch("/api/comments/1/")
            .send(newVote)
            .expect(200)
            .then(({ body }) => {
              expect(body[0].votes).to.equal(26);
            });
        });
      });
    });

    describe("POST Request", () => {
      describe("Status 201 - Created", () => {
        it("/api/articles/:article_id/comments  Posts a new comment", () => {
          const newComment = {
            username: "rogersop",
            body: "dave likes ham"
          };
          return request
            .post("/api/articles/1/comments")
            .send(newComment)
            .expect(201)
            .then(({ body }) => {
              expect(body[0].author).to.equal("rogersop");
            });
        });
      });
    });

    describe("Delete Request", () => {
      describe('"Status 204 - No Content', () => {
        it("/api/comments/:comment_id Deletes a comment in the database when given comment id", () => {
          return request.delete("/api/comments/1").expect(204);
        });
      });
    });
  });

  describe.only("Users Endpoint - /api/users", () => {
    describe("GET Request", () => {
      describe("Status 200 - OK", () => {
        it("/:username - responds with user with given username", () => {
          return request
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0].username).to.equal("lurker");
            });
        });
      });
    });
  });
});

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
          expect(body).to.haveOwnProperty("/api");
        });
    });

    describe("Status 404 - Not Found", () => {
      it("/ - responds from incorrect endpoint with message", () => {
        return request
          .get("/incorrect_route")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
      });
      it("/ - responds from incorrect endpoint with message", () => {
        return request
          .get("/api/incorrect_route")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
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

      describe("Status 404 - Not Found", () => {
        it("/ - responds from incorrect endpoint with message", () => {
          return request
            .get("/api/topics/incorrect_route")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Route Not Found");
            });
        });
      });
    });

    describe("Status 405 - Method not allowed", () => {
      it("/ - responds from incorrect method with message", () => {
        return request
          .put("/api/topics")
          .expect(405)
          .then(({ body }) => expect(body.msg).to.equal("Method Not Allowed"));
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

        it("/ - should return articles limited to ten items by default", () => {
          return request
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(10);
            });
        });

        it("/ - should return articles limited to the given limit query", () => {
          return request
            .get("/api/articles?limit=5")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(5);
            });
        });

        it("/ - should accept a query to determine which page to begin on", () => {
          return request
            .get("/api/articles?p=2")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(2);
            });
        });

        it("/:article_id - responds with the article with provided id", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article.article_id).to.equal(1);
            });
        });

        it("/:article_id/comments - an array of comments for the given article_id", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0]).to.haveOwnProperty("comment_id");
            });
        });

        it("/:article_id/comments - an empty array when passed a valid article id with no comments", () => {
          return request
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.eql([]);
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

      describe("400 Bad Request", () => {
        it("/?sort_by - should return 400 and error message when passed invalid query", () => {
          return request
            .get("/api/articles/?sort_by=invalid_query")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("/:article_id - should return 400 and error message when passed invalid parameter", () => {
          return request
            .get("/api/articles/abc")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
      });

      describe("404 Error", () => {
        it("/:article_id - should return 404 and error message when passed a valid parameter with no corresponding article", () => {
          return request
            .get("/api/articles/1000000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article does not exist");
            });
        });

        it("/:article_id/comments - should return 404 and error message when passed a valid parameter with no corresponding article", () => {
          return request
            .get("/api/articles/1000000/comments")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article does not exist");
            });
        });

        it("/:article_id - should return 404 and error message when passed a non-existant topic query", () => {
          return request
            .get("/api/articles?topic=not-a-topic")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad query");
            });
        });

        it("/:article_id - should return 404 and error message when passed a non-existant username query", () => {
          return request
            .get("/api/articles?username=not-an-author")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad query");
            });
        });
      });

      describe("Status 405 - Method not allowed", () => {
        it("/api/articles - responds with incorrect method with message", () => {
          return request
            .put("/api/articles")
            .expect(405)
            .then(({ body }) =>
              expect(body.msg).to.equal("Method Not Allowed")
            );
        });

        it("/api/comments/comment_id - responds with incorrect method with message", () => {
          return request
            .put("/api/comments/1")
            .expect(405)
            .then(({ body }) =>
              expect(body.msg).to.equal("Method Not Allowed")
            );
        });
      });
    });

    describe("Patch Request", () => {
      describe("Status 200 - OK", () => {
        it("/api/articles/:article_id Updates an article in the database when given an article id", () => {
          const inc_votes = 10;
          const newVote = { inc_votes };
          return request
            .patch("/api/articles/1/")
            .send(newVote)
            .expect(200)
            .then(({ body }) => {
              expect(body.updatedArticle.votes).to.equal(110);
            });
        });

        it("/api/comments/:comment_id Updates a comment in the database when given a comment id", () => {
          const inc_votes = 10;
          const newVote = { inc_votes };
          return request
            .patch("/api/comments/1/")
            .send(newVote)
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(26);
            });
        });

        it("/api/comments/:comment_id Returns an unaltered comment when sent a body with out an inc_votes key", () => {
          const newVote = {};
          return request
            .patch("/api/comments/1/")
            .send(newVote)
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(17);
            });
        });
      });

      describe("400 Bad Request", () => {
        it("api/articles/:article_id - should return 400 and error message when passed invalid parameter", () => {
          return request
            .patch("/api/articles/abc")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("api/comments/:comments_id - should return 400 and error message when passed invalid parameter", () => {
          return request
            .patch("/api/comments/abc")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("api/articles/:article_id - should return 400 and error message when passed invalid body", () => {
          const newVote = { inc_votes: "abc" };
          return request
            .patch("/api/articles/1")
            .send(newVote)
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("api/comments/:comment_id - should return 400 and error message when passed invalid inc_votes value", () => {
          const newVote = { inc_votes: "abc" };
          return request
            .patch("/api/comments/1")
            .send(newVote)
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
      });

      describe("Status 404 Error", () => {
        it("api/articles/:article_id - should return 404 and error message when passed a valid parameter with no corresponding article", () => {
          return request
            .patch("/api/articles/1000000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article does not exist");
            });
        });
      });

      it("api/comments/:comment_id - should return 404 and error message when passed a valid parameter with no corresponding article", () => {
        return request
          .patch("/api/comments/1000000")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Comment does not exist");
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
            expect(body.comment.author).to.equal("rogersop");
          });
      });
    });

    describe('"Status 400 - Bad Request"', () => {
      it("api/articles/:article_id/comments - should return 400 and error message when passed invalid parameter", () => {
        const newComment = {
          username: "rogersop",
          body: "dave likes ham"
        };
        return request
          .post("/api/articles/abc/comments")
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });

      it("api/articles/:article_id/comments - should return 400 and error message when rquest does not conatin all the required keys", () => {
        const newComment = {
          username: "rogersop"
        };
        return request
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request, incomplete request object");
          });
      });
    });

    describe("Status 404 Error", () => {
      it("api/articles/:article_id/comments - should return 404 and error message when passed a valid parameter with no corresponding article", () => {
        const newComment = {
          username: "rogersop",
          body: "dave likes ham"
        };
        return request
          .post("/api/articles/1000000/comments")
          .send(newComment)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Article does not exist");
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

  describe("Status - 400 Bad Request", () => {
    it("api/comments/:comment_id - should return 400 and error message when passed invalid parameter", () => {
      return request
        .delete("/api/comments/abc")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Bad Request");
        });
    });

    it("api/comments/:comment_id - should return 404 and error message when passed a valid id that does not exist", () => {
      return request
        .delete("/api/comments/10000000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Comment does not exist");
        });
    });
  });

  describe("Users Endpoint - /api/users", () => {
    describe("GET Request", () => {
      describe("Status 200 - OK", () => {
        it("/:username - responds with user with given username", () => {
          return request
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(body.user.username).to.equal("lurker");
            });
        });
      });
    });

    describe("Status - 404 Route not found", () => {
      it("api/users/:username - should return 404 and error message when passed invalid parameter", () => {
        return request
          .get("/api/users/non_existant_user")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("User does not exist");
          });
      });
    });

    describe("Status 405 - Method Not Allowed", () => {
      it("/ - responds from incorrect method with message", () => {
        return request
          .put("/api/users/lurker")
          .expect(405)
          .then(({ body }) => expect(body.msg).to.equal("Method Not Allowed"));
      });
    });
  });
});

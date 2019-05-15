\c news_solo_test;

-- SELECT articles.article_id,  articles.title FROM articles;

SELECT articles.article_id,  articles.title,  COUNT (comments.article_id) AS comment_count 
FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
 GROUP BY articles.article_id;
 
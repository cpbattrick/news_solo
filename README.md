# Back-End for Northcoders News

news_solo was created as the back-end api for a project at northcoders manchester. The project contains an sql database of articles and an api built using express. Details of the routes can be found at /api.

## Technologies

Express <br>
Postgres <br>
SQL <br>
Knex <br>

## Install

In the install directory run:

```bash
npm install
```

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```

### Required Versions

cors: 2.8.5, <br>
express: 4.16.4, <br>
knex: 0.16.5, <br>
pg: 7.11.0 <br>

### Link to Deployed Project

[https://news-sprint.herokuapp.com/api/](https://news-sprint.herokuapp.com/api/)

### Link to Deployed Front-End

[https://cpb-ncnews.netlify.com/](https://cpb-ncnews.netlify.com/)

### Link to Front-End Repository

https://github.com/cpbattrick/ncnews-frontend

## Authors

Charles Battrick

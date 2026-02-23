# Neville News Seeding

Hello, welcome to the Nevilles News Project.

## Technologies

- JavaScript
- CSS
- HTML
- SQL
- React
- Postgres

- Node v22.14.0

## Getting Started:

To start please create your own .env files in root directory:

- `.env.test`
- `.env.development`

In these files please connect to the connection.js by placing the following their respective .env.test and env.development files:

```
PGDATABASE = nc_news_test
PGDATABASE = nc_news
```

Once this is done please ensure you have .env.\* in your .gitignore

To check if this is working console.log the ENV variable in connection.js in jest test and in development environment to see it toggle from test to development.
const ENV = process.env.NODE_ENV || 'development'

Please check `package.json` for dependencies and run

```
npm install
```

### Creating Test and Development Databases:

To create Databases navigate to the db folder and run:

```
psql -f setup-dbs.sql
```

### Seeding the Database:

To seed the Database use the commands:

```
npm run test-seed
```

```
npm run seed-dev
```

## Local development

After creating databases and seeding please run

```
npm start
```

Note: Server will be running on [http://localhost:8800/api](http://localhost:8800/api)

## Endpoints

Example endpoints:

- [/api/topics](http://localhost:8800/api/topics)
- [/api/articles](http://localhost:8800/api/articles)
- [/api/users](http://localhost:8800/api/users)
- [/api/comments](http://localhost:8800/api/comments)

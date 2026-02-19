// const { Pool } = require("pg");

// const ENV = process.env.NODE_ENV || "development";

// require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

// const db = new Pool();

// if (!process.env.PGDATABASE) {
//   throw new Error("No PGDATABASE configured");
// } else {
//   console.log(`Connected to ${process.env.PGDATABASE}`);
// }

// const config = {};

// if (ENV === "production") {
//   config.connectionString = process.env.DATABASE_URL;
//   config.max = 2;
// }

// module.exports = db;
// module.exports = new Pool(config);

//

const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (process.env.NODE_ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
  config.ssl = {
    rejectUnauthorized: false,
  };
}

module.exports = new Pool(config);

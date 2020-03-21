require("dotenv").config(); //access to .env variables
// Update with your config settings.
const database = {
  client: process.env.CLIENT,
  connection: {
    host: process.env.LOCAL_HOST,
    database: process.env.DEVELOPMENT_DB
  },
  migrations: {
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  }
};

module.exports = {
  development: {
    ...database,
    connection: {
      port: process.env.POSTGRES_PORT,
      database: process.env.DEVELOPMENT_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    tableName: process.env.MIGRATIONS_TABLE
  },

  testing: {
    ...database,
    connection: {
      port: process.env.POSTGRES_PORT,
      database: process.env.TESTING_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    tableName: process.env.MIGRATIONS_TABLE
  },
  staging: {
    ...database,
    connection: process.env.HEROKU_POSTGRESQL_GOLD_URL,
    tableName: process.env.MIGRATIONS_TABLE
  },
  production: {
    ...database,
    connection: process.env.DATABASE_URL,
    tableName: process.env.MIGRATIONS_TABLE
  }
};

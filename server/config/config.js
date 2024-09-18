require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME,POSTGRES_PORT } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": DB_HOST,
    "port": POSTGRES_PORT,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": DB_HOST,
    "port": POSTGRES_PORT,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": DB_HOST,
    "port": POSTGRES_PORT,
    "dialect": "postgres"
  }
}

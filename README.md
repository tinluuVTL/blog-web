## Description

NodeJs, Express, MongoDb, ReactJs  

## Installation

```bash
client$ npm install

server$ npm install
create db: npx sequelize-cli db:create
create tables: npx sequelize-cli db:migrate
add seeders data: 
  npx sequelize-cli db:seed --seed 20210504092409-sample-categories.js
  npx sequelize-cli db:seed --seed 20210504062234-sample-users.js
  npx sequelize-cli db:seed --seed 20210504091954-sample-articles.js / npx sequelize-cli db:seed:all
  
```

## Running the app

```bash
make your .env file in the server folder:
  PORT=5000
  DB_HOST='127.0.0.1'
  DB_USERNAME='postgres'
  DB_PASSWORD='postgres'
  DB_NAME='blog_db_dev'


client$ npm run start
server$ npm run dev

```

## DB

```bash
  PostgreSQL
```

## Usage
```bash
    Login (http://localhost:3000) using username and password (password stored without hashing)

    There are 3 users:
        username: moderator, password: password
        username: admin, password: password
        username: member, password: password
```
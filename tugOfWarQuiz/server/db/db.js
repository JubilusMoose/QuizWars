const knex = require('knex')(){
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tugOfWar',
    charset: 'utf8'
  }
}

exports.knex = knex;
exports.bookshelf = require('bookshelf')(knex);

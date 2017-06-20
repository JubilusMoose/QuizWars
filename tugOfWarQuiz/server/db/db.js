const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'pass', // set a password if needed
    // password: '' // set a password if needed // pass
    database: 'tugOfWar',
    charset: 'utf8'
  }
})

exports.knex = knex;
exports.bookshelf = require('bookshelf')(knex);

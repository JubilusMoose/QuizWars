const bookshelf = require('./db').bookshelf;

const models = {};

models.User = bookshelf.Model.extend({
  tableName: 'users'
})

module.exports = models;
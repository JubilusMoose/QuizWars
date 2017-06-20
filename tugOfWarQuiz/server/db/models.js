const bookshelf = require('./db').bookshelf;

const models = {};

models.Student = bookshelf.Model.extend({
  tableName: 'students'
})

models.Teacher = bookshelf.Model.extend({
  tableName: 'teachers'
})

module.exports = models;
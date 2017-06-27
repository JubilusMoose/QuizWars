const bookshelf = require('./db').bookshelf;

const models = {};

// models.Student = bookshelf.Model.extend({
//   tableName: 'students'
// })

// models.Teacher = bookshelf.Model.extend({
//   tableName: 'teachers'
// })

models.User = bookshelf.Model.extend({
  tableName: 'users'
})

module.exports = models;
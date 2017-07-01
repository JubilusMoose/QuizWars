const bookshelf = require('./db').bookshelf;

const models = {};

models.User = bookshelf.Model.extend({
  tableName: 'users',
  games: function() {
    return this.belongsTo(models.Game);
  }
});

models.Game = bookshelf.Model.extend({
  tableName: 'games',
  users: function() {
    return this.hasMany(models.User);
  }
});

models.JoinedGame = bookshelf.Model.extend({
  tableName: 'users_games',
  user: function() {
    return this.belongsTo(models.User);
  },
  game: function() {
    return this.belongsTo(models.Game);
  }
})

module.exports = models;

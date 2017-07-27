const bookshelf = require('./db').bookshelf;

const models = {};

models.User = bookshelf.Model.extend({
  tableName: 'users',
  games: function() {
    return this.belongsTo(models.Game);
  },
  joinedGame: function() {
    return this.belongsTo(models.JoinedGame);
  }
});

models.Game = bookshelf.Model.extend({
  tableName: 'games',
  users: function() {
    return this.hasMany(models.User);
  },
  joinedGame: function() {
    return this.hasMany(models.JoinedGame);
  }
});

models.JoinedGame = bookshelf.Model.extend({
  tableName: 'users_games',
  users: function() {
    return this.belongsTo(models.User);
  },
  games: function() {
    return this.belongsTo(models.Game);
  },
});

module.exports = models;

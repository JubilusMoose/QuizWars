const knex = require('./db').knex;
const { User, Game, JoinedGame } = require('./models');

module.exports = {
  resetDB: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url}`);
    knex.schema
    .dropTableIfExists('users_games')
    .dropTableIfExists('users')
    .dropTableIfExists('games')

    // Games
    .createTable('games', (table) => {
      table.increments().primary();
      table.string('name').unique();
      table.string('creator');
    })

    // Users
    .createTable('users', (table) => {
      table.increments().primary();
      table.string('email').unique();
      table.string('password');
      table.string('name');
      table.integer('game_id').unsigned().references('games.id');
    })

    // JoinedGames
    .createTable('users_games', (table) => {
      table.increments().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('game_id').unsigned().references('games.id');
    })
      
    // Create preset users
    .then(() => {
      return new User({
        email: 'paul@aol.com',
        password: 'test',
        name: 'Mr Adams'
      })
      .save().then((model) => {
        return model.get('id');
      })
    })
    .then(() => {
      console.log('return new User');
      return new User({
        email: 'kid@aol.com',
        password: 'test',
        name: ''
      })
      .save().then((model) => {
        return model.get('id');
      })
    })
    .then(() => {
      console.log('return new User');
      return new User({
        email: 'jon@aol.com',
        password: 'test',
        name: 'Johnny Test'
      })
      .save().then((model) => {
        return model.get('id');
      })
    })

    // Create preset game
    .then((userId) => {
      console.log('return new Game', userId);
      return new Game({
        name: 'My First Game',
        creator: userId
      })
      .save().then((model) => {
        return model.get('id');
      });
    })

    // Send back result
    .then(() => {
      res.send('DB created');
    })
    .catch((err) => {
      console.log('error in DB creation', err);
      res.send(err);
    })
  }
};

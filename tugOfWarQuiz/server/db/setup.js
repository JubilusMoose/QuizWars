const knex = require('./db').knex;
const { User } = require('./models');

module.exports = {
  resetDB: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url}`);
    knex.schema
    .dropTableIfExists('users')
    .createTable('users', (table) => {
      table.increments().primary();
      table.string('email').unique();
      table.string('password');
      table.string('name');
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
    .then(() => {
      console.log('return new User');
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
      res.send('DB created');
    })
    .catch((err) => {
      console.log('error in DB creation', err);
      res.send(err);
    })
  }
};

// console.log(`Serving ${req.method} request for ${req.url}`);
// knex.schema
// .dropTableIfExists('students')
// .dropTableIfExists('teachers')
// .createTable('students', (table) => {
//   table.increments().primary();
//   table.string('email').unique();
//   table.string('password');
//   table.string('name');
// })
// .createTable('teachers', (table) => {
//   table.increments().primary();
//   table.string('email').unique();
//   table.string('password');
//   table.string('name');
// })
// .then(() => {
//   console.log('return new Student');
//   return new Student({
//     email: 'student@aol.com',
//     password: 'test',
//     name: 'Johnny Test'
//   })
//   .save().then((model) => {
//     return model.get('id');
//   })
// })
// .then(() => {
//   console.log('return new Teacher');
//   return new Teacher({
//     email: 'teacher@aol.com',
//     name: 'Mr Anderson',
//     password: 'test'
//   })
//   .save().then((model) => {
//     return model.get('id');
//   })
// })
// .then(() => {
//   res.send('DB created');
// })
// .catch((err) => {
//   console.log('error in DB creation', err);
//   res.send(err);
// })

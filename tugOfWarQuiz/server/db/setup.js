const knex = require('./db').knex;
const { Student, Teacher } = require('./models');

module.exports = {
  create: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url}`);
    knex.schema
    .dropTable('students')
    .dropTable('teachers')
    .createTable('students', (table) => {
      table.increments().primary()
      table.string('student_id').unique()
      table.string('password')
      table.string('name')
    })
    .createTable('teachers', (table) => {
      table.increments().primary()
      table.string('teacher_id').unique()
      table.string('password')
      table.string('name')
    })
    .then(() => {
      console.log('return new Student');
      return new Student({
        name: 'Test',
        password: 'test'
      })
      .save().then((model) => {
        return model.get('id');
      })
    })
    .then((res) => {
      console.log('Response from DB', res);
      res.send('DB created');
    })
    .catch((err) => {
      console.log('error in DB creation', err);
      res.send(err);
    })
  }
};

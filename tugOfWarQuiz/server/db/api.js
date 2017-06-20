const headers = require('../headers');
const { Student, Teacher } = require('./models');

module.exports = {
  students: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (api.default)`);
    new Student()
    .fetchAll()
    .then((students) => {
      console.log('students fetched');
      res.send(students.toJSON())
    })
    .catch((err) => {
      console.log('error fetching students', err);
      res.send(err);
    })
  }
}
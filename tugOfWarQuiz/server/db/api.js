const headers = require('../headers');
const { Student, Teacher } = require('./models');

module.exports = {


  loginStudent: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (api.default)`);
    new Student({
      email: req.body.email,
      password: req.body.password
    })
    .fetch()
    .then((student) => {
      console.log('students fetched');
      res.send(student);
    })
    .catch((err) => {
      console.log('error fetching students', err);
      res.send(err);
    })
  }
}
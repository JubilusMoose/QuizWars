const headers = require('./headers');
const { Student, Teacher } = require('./db/models');


const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {

  signupStudent: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.signupStudent)`);
    new Student({
      email: req.body.email,
      password: req.body.password
    })
    .save()
    .then((model) => {
      console.log('student successfully signed up');
      sendResponse(res, 200, headers, JSON.stringify(model));
    })
    .catch((err) => {
      console.log('error in signupStudent', err);
      sendResponse(res, 400, headers, JSON.stringify(err));
    })
  },

  loginStudent: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.loginStudent)`);
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
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
    const email = req.body.email;
    const password = req.body.password;

    new Student()
    .where('email', email)
    .fetch()
    .then((student) => {
      console.log('student', student)
      if(student) {
        sendResponse(res, 200, headers, 'email in system');
      } else {
        new Student({
          email,
          password
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
      }
    })
    .catch((err) => {
      console.log('error in signupStudent', err);
      sendResponse(res, 400, headers, JSON.stringify(err));
    })
  },

  signupTeacher: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.signupTeacher)`);
    const email = req.body.email;
    const password = req.body.password;

    new Teacher()
    .where('email', email)
    .fetch()
    .then((teacher) => {
      console.log('teacher', teacher)
      if(teacher) {
        sendResponse(res, 200, headers, 'email in system');
      } else {
        new Teacher({
          email,
          password
        })
        .save()
        .then((model) => {
          console.log('Teacher successfully signed up');
          sendResponse(res, 200, headers, JSON.stringify(model));
        })
        .catch((err) => {
          console.log('error in signupTeacher', err);
          sendResponse(res, 400, headers, JSON.stringify(err));
        })
      }
    })
    .catch((err) => {
      console.log('error in signupStudent', err);
      sendResponse(res, 400, headers, JSON.stringify(err));
    })
  },

  loginStudent: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.loginStudent)`);
    const email = req.body.email;
    const password = req.body.password;
    new Student({
      email,
      password
    })
    .fetch()
    .then((student) => {
      console.log('student fetched');
      res.send(student);
    })
    .catch((err) => {
      console.log('error fetching students', err);
      res.send(err);
    })
  },

  loginTeacher: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.loginTeacher)`);
    const email = req.body.email;
    const password = req.body.password;
    new Teacher({
      email,
      password
    })
    .fetch()
    .then((teacher) => {
      console.log('teacher fetched');
      res.send(teacher);
    })
    .catch((err) => {
      console.log('error fetching teacher', err);
      res.send(err);
    })
  }
}
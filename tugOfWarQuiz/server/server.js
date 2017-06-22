const headers = require('./headers');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Database setup and helpers
const setup = require('./db/setup');
const api = require('./db/api');
const helpers = require('./helpers');

app.set('views', __dirname + '/../public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

// Admin only calls... Delete some when going live
app.get('/resetDB', (req, res) => {
  console.log('resetDB requested');
  setup.resetDB(req, res);
})

app.get('/allStudents', (req, res) => {
  api.retrieveStudentList(req, res);
})

app.get('/allTeachers', (req, res) => {
  api.retrieveTeacherList(req, res);
})

app.get('/allPeople', (req, res) => {
  api.retrieveAll(req, res);
})

// Calls from FE
app.post('/login', (req, res) => {
  console.log('check user in database', req.body);
  if(req.body.access === 'teacher') {
    helpers.loginTeacher(req, res);
  } else if (req.body.access === 'student') {
    helpers.loginStudent(req, res);
  } else {
    sendResponse(res, 400, headers, 'Login unsuccessful')
  }
})

app.post('/signup', (req, res) => {
  console.log('save user to database', req.body);
  if(req.body.access === 'teacher') {
    helpers.signupTeacher(req, res);
  } else if (req.body.access === 'student') {
    helpers.signupStudent(req, res);
  } else {
    sendResponse(res, 400, headers, 'Sign up unsuccessful')
  }
})

app.get('/newGame', (req, res) => {
  console.log('get request to newGame successfully ran');
  sendResponse(res, 200, headers, 'Good to start a new game!');
});

app.get('*', (req, res) => {
  res.render('index.html');
})

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

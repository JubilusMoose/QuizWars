const headers = require('./headers');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const sessions= require('client-sessions');
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
// app.use(sessions({
//   cookieName: 'session',
//   secret: 'akjhahaeo039u40qfewhroin30934noewv30v34f',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000
// }));

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

app.get('/allUsers', (req, res) => {
  api.retrieveAll(req, res);
})

// Calls from FE
app.post('/login', (req, res) => {
  console.log('check user in database', req.body);
  helpers.login(req, res);
})

app.post('/signup', (req, res) => {
  console.log('save user to database', req.body);
  helpers.signup(req, res);
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

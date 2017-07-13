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

app.get('/allUsers', (req, res) => {
  api.retrieveAllUsers(req, res);
})

app.get('/allGames', (req, res) => {
  api.retrieveAllGames(req, res);
})

app.get('/allJoinedGames', (req, res) => {
  api.retrieveAllJoinedGames(req, res);
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

app.post('/changeName', (req, res) => {
  console.log('change name in db', req.body);
  helpers.changeName(req, res);
})

app.post('/createGame', (req, res) => {
  console.log('create game', req.body);
  helpers.createGame(req, res);
})

app.post('/joinRoom', (req, res) => {
  console.log('post request to joinRoom successfully ran');
  helpers.joinRoom(req, res);
});

app.get('*', (req, res) => {
  res.render('index.html');
})

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

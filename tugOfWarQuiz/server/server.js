const headers = require('./headers');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('views', __dirname + '/../public');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sendResponse = function (res, statusCode, headersSent, responseMessage) {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

app.post('/login', (req, res) => {
  console.log('save user to database');
  sendResponse(res, 200, headers, 'Login successful');
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

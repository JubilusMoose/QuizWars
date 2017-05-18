const headers = require('./headers');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('views', __dirname + '/../public');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sendResponse = function (res, statusCode, headersSent, responseMessage) {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

app.get('/newGame', (req, res) => {
  console.log('newGame requested');
  sendResponse(res, 200, headers, 'Good to start a new game!');
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('views', __dirname + '/../public');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

app.get('/', (req, res) => {
  console.log('req');
  res.writeHead(200, headers);
  res.render('../public/app/home/home.html');
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

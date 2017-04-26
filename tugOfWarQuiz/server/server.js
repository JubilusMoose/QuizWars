var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(path.resolve('../public/partials/welcome.html'));
});

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
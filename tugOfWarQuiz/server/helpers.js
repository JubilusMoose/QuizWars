const headers = require('./headers');
// const sessions= require('client-sessions');
const { User } = require('./db/models');


const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {

  signup: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.signup)`);
    const email = req.body.email;
    const password = req.body.password;

    new User({
      email,
      password
    })
    .save()
    .then((user) => {
      console.log('user successfully signed up');
      // req.session.user = user;
      sendResponse(res, 200, headers, JSON.stringify(user));
    })
    .catch((err) => {
      console.log('error in signup', err);
      sendResponse(res, 200, headers, 'email in system');
    })
  },

  login: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.login)`);
    const email = req.body.email;
    const password = req.body.password;
    
    new User({
      email,
      password
    })
    .fetch()
    .then((user) => {
      console.log('user fetched');
      // req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log('error fetching users', err);
      res.send(err);
    })
  },

  changeName: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.changeName)`);
    const email = req.body.email;
    const name = req.body.name;

    new User()
    .where({
      email
    })
    .save({
      name
    })
    .then((user) => {
      console.log('user fetched', user)
      res.send('user name updated');
    })
  }
}
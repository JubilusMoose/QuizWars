const headers = require('../headers');
const { User } = require('./models');

const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {
  
  retrieveAll: (req, res) => {
    new User()
    .fetchAll()
    .then((allUsers) => {
      sendResponse(res, 200, headers, JSON.stringify(allUsers));
    })
  }
}
const headers = require('../headers');
const { Student, Teacher } = require('./models');

const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {

  retrieveStudentList: (req, res) => {
    new Student()
    .fetchAll()
    .then((allStudents) => {
      sendResponse(res, 200, headers, JSON.stringify(allStudents));
    })
  }
}
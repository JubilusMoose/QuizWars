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
  },

  retrieveTeacherList: (req, res) => {
    new Teacher()
    .fetchAll()
    .then((allTeachers) => {
      sendResponse(res, 200, headers, JSON.stringify(allTeachers));
    })
  },

  retrieveAll: (req, res) => {
    new Teacher()
    .fetchAll()
    .then((allTeachers) => {
      new Student()
      .fetchAll()
      .then((allStudents) => {
        allPeople = {};
        allPeople.teachers = allTeachers;
        allPeople.students = allStudents;
        sendResponse(res, 200, headers, JSON.stringify(allPeople));
      })
    })
  }
}
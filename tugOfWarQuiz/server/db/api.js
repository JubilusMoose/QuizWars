const headers = require('../headers');
const { User, Game, JoinedGame, GameQuestions } = require('./models');

const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {
  
  retrieveAllUsers: (req, res) => {
    new User()
    .fetchAll()
    .then((allUsers) => {
      sendResponse(res, 200, headers, JSON.stringify(allUsers));
    })
  },

  retrieveAllGames: (req, res) => {
    new Game()
    .fetchAll()
    .then((allGames) => {
      sendResponse(res, 200, headers, JSON.stringify(allGames));
    })
  },

  retrieveAllJoinedGames: (req, res) => {
    new JoinedGame()
    .fetchAll()
    .then((allJoinedGames) => {
      sendResponse(res, 200, headers, JSON.stringify(allJoinedGames));
    })
  },

  retrieveAllGameQuestions: (req, res) => {
    new GameQuestions()
    .fetchAll()
    .then((allGameQuestions) => {
      sendResponse(res, 200, headers, JSON.stringify(allGameQuestions));
    })
  }
}
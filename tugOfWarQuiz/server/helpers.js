const headers = require('./headers');
const { User, Game, JoinedGame, GameQuestions } = require('./db/models');

const sendResponse = (res, statusCode, headersSent, responseMessage) => {
  console.log(responseMessage);
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {

  // Signs up a new user
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
      new JoinedGame({
        user_id: user.get('id'),
        game_id: 1
      })
      .save().then(() => {
        res.send(user);
      })
    })
    .catch((err) => {
      console.log('error in signup', err);
      sendResponse(res, 200, headers, 'email in system');
    })
  },

  // Logs in a current user
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
      if(user) {
        console.log('user in system')
        res.send(user)
      } else {
        console.log('user not in system')
        sendResponse(res, 200, headers, 'user not in system');
      }
    })
    .catch((err) => {
      console.log('error fetching user', err);
      sendResponse(res, 200, headers, 'error fetching user');
    })
  },

  // Changes a users name
  changeName: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.changeName)`);
    const email = req.body.email;
    const name = req.body.name;

    new User()
    .where({email})
    .save({name}, {patch: true})
    .then((user) => {
      console.log('user fetched', user)
      res.send('user name updated');
    })
    .catch((err) => {
      console.log('error changing user name', err);
      sendResponse(res, 200, headers, 'error changing user name');
    })
  },

  // Creates a new game
  createGame: (req, res) => {
    // console.log('req.body', req.body);
    // Set constants to body parts
    const gameName = req.body.gameName;
    const creatorId = req.body.userId;
    const teamOne = req.body.teamOne;
    const teamTwo = req.body.teamTwo;
    const questions = req.body.questions;
    const answers = req.body.answers;

    console.log('questions in server', questions);
    console.log('answers in server', answers);

    // See if game exists with the same name
    new Game({ 
      name: gameName, 
    })
    .fetch()
    .then((gameModel) => {
      // console.log('gameModel in createGame', gameModel);

      // If the game exists
      if(gameModel !== null) {
        // Tell front end game exists
        console.log('game already created');
        res.send('game already created');
      } else {
        // Create the game if it doesn't exist
        new Game({
          name: gameName, 
          team_one: teamOne,
          team_two: teamTwo,
          creator: creatorId
        })
        .save()
        .then((gameModel) => {
          const gameId = gameModel.get('id');
          const gameName = gameModel.get('name');
          console.log('gameModel 2 in createGame', gameModel);

          // Add questions to DB
          for(let i = 0; i < questions.length; i++) {
            new GameQuestions({
              game_id: gameId,
              question: questions[i], 
              answer: answers[i]
            }).save()
          }

          res.send(gameModel.attributes);
        })
      }
    })
    .catch((err) => {
      console.log('error in creating game', err)
      sendResponse(res, 200, headers, 'game already created');
    })
  },

  // Joins a current game
  joinRoom: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.joinRoom)`);
    console.log('req.body', req.body);
    const name = req.body.name;
    const roomName = req.body.roomName;
    const userId = req.body.userId;
    
    // Does game exist?
    new Game({ name: roomName })
    .fetch()
    .then((gameModel) => {
      // console.log('gameModel', gameModel);

      // If game doesn't exist
      if(!gameModel) {

        //Send back that game doesn't exist
        res.send('room does not exist');   

      // Otherwise, add user to game
      } else {
        var gameId = gameModel.get('id');
        new User({ id: userId })
        .save({ game_id: gameId }, { patch: true })
        .then((user) => {
          new JoinedGame()
          .where({ 
            user_id: userId,
            game_id: gameId
          })
          .save({ 
            user_id: userId,
            game_id: gameId
          })
          .then((savedJoinedGame) => {

            // Find all of the names of the players in the joinedGame with the id of the game
            new Game({ id: gameId })
            .fetch({ withRelated: ['users', 'questions']})
            .then((allUsersAndQuestions) => {
              console.log('listOfPlayerNames', allUsersAndQuestions.toJSON());
              res.send(allUsersAndQuestions.toJSON());
            })
          })
        })     
      }
    })
    .catch((err) => {
      console.log('error in joinRoom', err);
      res.send('error in joinRoom');
    })
  },

  answer: (req, res) => {
    console.log('answer request in helpers');
    var question = req.body.question;
    const answer = req.body.answer;
    const game = req.body.game;
    const user = req.body.user;

    new Game({ name: game })
    .fetch()
    .then((gameModel) => {

      // If game doesn't exist
      if(!gameModel) {

        //Send back that game doesn't exist
        res.send('room does not exist');   

      // Otherwise, find correct answer for the question
      } else {
        var gameId = gameModel.get('id');
        // Find answer to question
        new Game({ id: gameId })
        .fetch({ withRelated: ['questions']})
        .then((allQuestionsAndAnswers) => {
          console.log('list of Answers and Questions', allQuestionsAndAnswers.toJSON().questions);
          allQuestionsAndAnswers.toJSON().questions.forEach((questionSet) => {
            if (questionSet.question === question) {
              if (questionSet.answer === answer) {
                console.log('correct answer');
                res.send('correct');
              } else {
                console.log('wrong answer')
                res.send('incorrect');
              }
            }
          })

        })

      }

      // Send back correct answer
    })
  }
}


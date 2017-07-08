const headers = require('./headers');
const { User, Game, JoinedGame } = require('./db/models');


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
      new JoinedGame({
        user_id: user.get('id'),
        game_id: 1
      })
      .save().then(() => {
        sendResponse(res, 200, headers, JSON.stringify(user));
      })
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
      console.log('user', user);
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

  createGame: (req, res) => {
    console.log('req.body', req.body);
    const gameName = req.body.gameName;
    const creatorId = req.body.userId;

    new Game({ 
      name: gameName, 
      creator: creatorId 
    })
    .fetch()
    .then((gameModel) => {
      console.log('gameModel', gameModel)
      if(gameModel !== null) {
        console.log('game already created')
        res.send('game already created');
      } else {
        new Game({
          name: gameName, 
          creator: creatorId
        })
        .save()
        .then((gameModel) => {
          console.log('gameModel saved', gameModel);
        })
      }
    })
    .catch((err) => {
        console.log('error in creating game', err)
        sendResponse(res, 200, headers, 'game already created');
    })
  },

  joinRoom: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (helpers.joinRoom)`);
    console.log('req.body', req.body);
    const roomName = req.body.roomName;
    const userName = req.body.userName;
    
    new Game({ name: roomName })
    .fetch()
    .then((gameModel) => {
      const game_id = gameModel.id;
      new User({ name: userName })
      .fetch()
      .then((userModel) => {
        const user_id = userModel.id;
        new JoinedGame()
        .save({
          user_id,
          game_id
        })
        .then((joinedGameModel) => {
          console.log('joinedGameModel', joinedGameModel);
          new Game({ id: game_id })
          .fetch({ withRelated: ['users']})
          .then((arr) => {
            console.log('arr', arr);
          })
        })
      })
    })
    .catch((err) => {
      console.log('error in joinRoom', err);
    })
  }
}

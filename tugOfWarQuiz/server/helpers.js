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
      console.log('user fetched');
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
    .where({email})
    .save({name}, {patch: true})
    .then((user) => {
      console.log('user fetched', user)
      res.send('user name updated');
    })
  },

  createGame: (req, res) => {
    console.log('req.body', req.body);
    
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

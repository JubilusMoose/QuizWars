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
        res.send(user);
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
      console.log('gameModel in createGame', gameModel)
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
          const gameId = gameModel.get('id');
          const gameName = gameModel.get('name');
          console.log('gameModel 2 in createGame', gameModel);
          res.send(`${gameName} created with ID of ${gameId}`);
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
    const userId = req.body.userId;
    
    new Game({ name: roomName })
    .fetch()
    .then((gameModel) => {
      if(!gameModel) {
        console.log('room does not exist');
        res.send('room does not exist');
      } else {
        const game_id = gameModel.get('id');
        new User({ id: userId })
        .fetch()
        .then((userModel) => {
          const user_id = userModel.get('id');
          console.log('user fetched for user', user_id);
          new JoinedGame({ 
            user_id,
            game_id 
          })
          .fetch()
          .then((joinedGameModel) => {
            if(!joinedGameModel) {
              new JoinedGame()
              .save({
                user_id,
                game_id
              }) 
              .then((joinedGameModel) => {
                console.log('joinedGameModel id', joinedGameModel.get('id'))
                new Game({ id: game_id })
                .fetch({ withRelated: ['users']})
                .then((arr) => {
                  console.log('arr', arr);
                  res.send('sending array')
                })
              })
            } else {
              console.log('user already joined game');
              res.send('user already joined game');
            }
          })
        })  
      }
    })
    .catch((err) => {
      console.log('error in joinRoom', err);
      res.send('error in joinRoom');
    })
  }
}

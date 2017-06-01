const knex = require('./db').knex;
const { Student, Teacher } = require('./models');

module.exports = {
  create: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url}`);
  }
}

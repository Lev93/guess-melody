
const Sequelize = require('sequelize');
const Result = require('./Result');
const db = require('../db');

const Users = db.define('users', {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  bestresult: {
    type: Sequelize.NUMBER,
  },
}, {
  schema: 'public',
  tableName: 'users',
});

Users.hasMany(Result, { foreignKey: 'user_id' });

module.exports = Users;

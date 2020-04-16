
const Sequelize = require('sequelize');
const Users = require('./Users');
const db = require('../db');

const Result = db.define('results', {
  result: {
    type: Sequelize.NUMBER,
  },
  user_id: {
    type: Sequelize.INTEGER,

    references: {
      // This is a reference to another model
      model: Users,
      // This is the column name of the referenced model
      key: 'id',
      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
}, {
  schema: 'public',
  tableName: 'results',
});


module.exports = Result;

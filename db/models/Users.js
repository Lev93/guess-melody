'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bestresult: DataTypes.INTEGER,
  }, {
    schema: 'public',
    tableName: 'users',
  });
  Users.associate = function(models) {
    // associations can be defined here
   // Users.hasMany(models.Result, { as: 'user_id', foreignKey: 'user_id' });
  };
  return Users;
};

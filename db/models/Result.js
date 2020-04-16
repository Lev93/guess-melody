'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('results', {
    result: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users',
          schema: 'public',
        },
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    schema: 'public',
    tableName: 'results',
  });
  Result.associate = function (models) {
    // associations can be defined here
  };
  return Result;
};

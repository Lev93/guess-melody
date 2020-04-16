'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'levriabov12345@mail.ru',
      password: '$2a$10$xlHPloLiNUlW2NF7IZUlsOo.Ob53O1kS4D8rpzdtkGwGT7EHCfbgm',
      bestresult: 4000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

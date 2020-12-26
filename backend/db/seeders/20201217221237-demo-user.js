'use strict';
// External dependencies
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { 
        username: "Demo-lition", 
        displayName: "Demo",
        email: "demo@user.io",
        hashedPassword: bcrypt.hashSync('password'),
        avatarImg: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?cs=srgb&dl=pexels-carolina-castilla-arias-1716861.jpg&fm=jpg",
        headerImg: "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?cs=srgb&dl=pexels-dom-j-310452.jpg&fm=jpg"
      },
      { 
        username: "FakeUser1",
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      { 
        username: "FakeUser2", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in ]: ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {});
  }
};

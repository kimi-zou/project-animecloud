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
        username: "User-1",
        displayName: "Kotaru Bokuto",
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/1.jpeg",
      },
      { 
        username: "User-2",
        displayName: "kageyama tobio", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/2.jpeg",
      },
      { 
        username: "User-3",
        displayName: "Naruto", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/3.jpeg",
      },
      { 
        username: "User-4",
        displayName: "L", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/4.jpg",
      },
      { 
        username: "User-5",
        displayName: "Tororo", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/5.jpg",
      },
      { 
        username: "User-6",
        displayName: "Nezuko Kamado", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/6.jpeg",
      },
      { 
        username: "User-7",
        displayName: "Saitama", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/7.jpeg",
      },
      { 
        username: "User-8",
        displayName: "Tony Tony Chopper", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/8.jpg",
      },
      { 
        username: "User-9",
        displayName: "Saber", 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-avatars/9.png",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in ]: ['Demo-lition', 'User-1', 'User-2']}
    }, {});
  }
};

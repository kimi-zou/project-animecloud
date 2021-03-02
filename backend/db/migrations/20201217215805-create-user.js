'use strict'; 
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
        unique: true,
      },
      displayName: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      avatarImg: {
        allowNull: true,
        type: Sequelize.STRING(256),
      },
      headerImg: {
        allowNull: true,
        type: Sequelize.STRING(256),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
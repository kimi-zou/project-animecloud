'use strict'; 
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      coverImg: {
        allowNull: true,
        type: Sequelize.STRING(256)
      },
      trackPath: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
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
    return queryInterface.dropTable('Tracks');
  }
};
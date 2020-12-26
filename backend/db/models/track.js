'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 256],
      },
    },
    description: DataTypes.TEXT,
    coverImg: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 256],
      }
    },
    trackPath: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 256],
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, {foreignKey:"userId"})
  };
  return Track;
};
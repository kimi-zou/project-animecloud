'use strict';
// External dependencies
const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    }, 
    avatarImg: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 256],
      }
    },
    headerImg: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 256],
      }
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    User.hasMany(models.Track, {foreignKey:"userId"})
  };

  //--------------   Methods ---------------
  // 1. Return user object that's safe to save to a JWT
  User.prototype.toSafeObject = function () { // No arrow function
    const { id, username, displayName, email, avatarImg, headerImg  } = this;
    return { id, username, displayName, email, avatarImg, headerImg  };
  };

  // 2. Verify password
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  //--------------  Static Methods (not work for instances) ---------------
  // 1. get user by id
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  }

  // 2. login
  User.login = async function ({ credential, password}) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  // 3. signup
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
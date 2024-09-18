'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'member' }, //role can be model
    login: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Article, {as: 'articles',})
  };

  return User
};
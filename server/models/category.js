'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Article, {
      as: 'articles',
      onDelete: 'cascade',
      hooks: true 
    });
  };
  return Category;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    image: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {}) 

  Article.associate = function(models) {
    Article.belongsTo(models.Category, {foreignKey: 'CategoryId', as: 'category'});
    Article.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'});
    
  };

  return Article;
};
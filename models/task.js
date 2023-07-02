'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
   
    static associate(models) {
      Task.belongsTo(models.User,{
        as: 'user'
      });
      Task.belongsToMany(models.Category, {
        through: 'TaskCategories',
        as: 'categories'
      });
    }
  }
  Task.init({
    description: DataTypes.TEXT,
    
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};
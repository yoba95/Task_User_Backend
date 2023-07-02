'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    static associate(models) {
      User.hasMany(models.Task,{
        as: 'tasks'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    password_hash: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'User',
  });
  User.login = function(email, password_hash){
    //buscar al usuario
    return User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if(!user) return null;
      //TODO: forma de hacer que retorne el usuario con sus credenciales
      /*return user.authenticatePassword(password_hash).then(valid =>{
        if (valid) return user;
        return null;
      });*/
      //** forma de hacer que retorne el usuario con sus crendenciales nomas que utilizando el operador ternario es lo mismo que la linea anterior */
       return user.authenticatePassword(password_hash).then(valid => valid ? user: null);
    });
  };

  User.prototype.authenticatePassword = function(password_hash){
    return new Promise((res,rej) =>{
      bcrypt.compare(password_hash, this.password, function(err, valid){
        if(err) return rej(err);
        res(valid);
      })
    })
  }
  User.beforeCreate(function(user, options){
    return new Promise((res, rej)=>{
       if (user.password_hash) {
        bcrypt.hash(user.password_hash, 10, function(error, hash){
          user.password = hash;
          res();
          })
        };
    });
   
  });
  return User;
};
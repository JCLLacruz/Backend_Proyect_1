'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Order);
      User.belongsTo(models.Token);
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    created_at: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
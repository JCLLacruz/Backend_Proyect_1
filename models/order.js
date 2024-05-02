'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product,{through:models.productorder});
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
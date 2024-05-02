'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category,{through:models.productcategory});
      Product.belongsToMany(models.Order,{through:models.productorder});

    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    WarehouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
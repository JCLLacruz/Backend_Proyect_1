'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category,{through:models.ProductCategory});
      Product.belongsToMany(models.Order,{through:models.ProductOrder});
      Product.hasMany(models.Review);
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please fill in product name'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in product description'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in a correct price format. 00.00'
        }
      }
    },
    stock: DataTypes.INTEGER,
    WarehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in the correct WarehouseId.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
    getterMethods: { 
      imageURL() {
        return `/public/images/user/products/${this.image_url}`;
      }
    }
  });
  return Product;
};
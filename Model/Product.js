let sequelize = require('./Connect')
const Sequelize = require('sequelize');
const Purchased = require('../Model/Purchased');

const Product = sequelize.define('product', {
    asin: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    productName: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: true
        }
    },
    productDescription: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: true
        }
    },
    group: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
});

Product.hasMany(Purchased, {foreignKey:'asin'});
module.exports = Product;
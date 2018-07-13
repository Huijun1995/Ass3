const sequelize = require('./Connect')
const Sequelize = require('sequelize');
const Product = require('../Model/Product');

const Purchased = sequelize.define('purchased', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    asin: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = Purchased;
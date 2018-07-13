var sequelize = require('./Connect')
const Sequelize = require('sequelize');

const productPairs = sequelize.define('productPairs', {
    asin1: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    asin2: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
});


module.exports = productPairs;
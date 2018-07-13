let Purchased = require('../Model/Purchased');
let Product = require('../Model/Product');
let productPairs = require('../Model/productPairs');
const Sequelize = require('sequelize');
module.exports = async function (req, res) {
    if(req.session.loginUser) {
        let asin = req.body.asin;
        console.log("*********************");
        console.log(asin);
        let checkres = await checkProduct(asin);
        if(checkres) {
            let products = await getProduct(asin);
            res.json({"message": "The action was successful", "products": products});
        }
        else {
            res.json({"message": "There are no recommendations for that product"});
        }
    }
    else{
        res.json({"message": "You are not currently logged in"});
    }
};

async function checkProduct(asin) {
    let checkres = await Purchased.findAll({
        where: {asin: asin}
    });
    if(checkres.length != 0) {
        return true;
    }
    return false;
}

async function getProduct(asin) {
    let products = await productPairs.findAll({
        where: {
            asin1: asin
        },
        group: ['asin2'],
        order: [[Sequelize.fn('count', Sequelize.col('asin2')), 'DESC']],
        attributes: ['asin1', 'asin2'],
        limit: 5
    });
    return products;
}
let Purchased = require('../Model/Purchased');
let Product = require('../Model/Product');
let productPairs = require('../Model/productPairs');
let User = require('../Model/User');
const Sequelize = require('sequelize');

module.exports = async function (req, res) {
    if(req.session.loginUser) {
        if(req.session.loginUser === "jadmin") {
            let user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });
            if(user != null) {
                let username = req.body.username;
                let products = await getProducts(username);
                res.json({"message":"The action was successful","product": products});
            }
            else {
                res.json({"message": "There are no users that match that criteria"});
            }
        }
        else {
            res.json({"message": "You must be an admin to perform this action"});
        }
    }
    else{
        res.json({"message": "You are not currently logged in"});
    }
};

async function getProducts(username) {
    let products = await Product.findAll({
        attributes: ['productName', [Sequelize.fn('COUNT', 'Purchased.asin'), 'quantity']],
        include: [{
            model: Purchased,
            where: {
                username: username
            },
            require:true,
            nested: false
        }],
        group: ['Product.asin']
    });

    let result = JSON.stringify(products, function(key, val) {
        if (key !== "purchaseds")
            return val;
    });
    cur = result.replace(/'/g, "\"", "g");
    return JSON.parse(cur);
}
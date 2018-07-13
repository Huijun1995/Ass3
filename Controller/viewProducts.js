var Product = require('../Model/Product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (req, res) {
    var req_asin;
    var req_group;
    var req_keyword;

    if(req.body.asin && req.body.asin != ''){
        req_asin = req.body.asin;
    }
    else {
        req_asin = '%%';
    }

    if(req.body.group && req.body.group != ''){
        req_group = req.body.group;
    }
    else {
        req_group = '%%';
    }

    if(req.body.keyword && req.body.keyword != ''){
        req_keyword = '%' + req.body.keyword + '%';
    }
    else {
        req_keyword = '%%';
    }

    Product.findAll({
        attributes: ['asin', 'productName'],
        where: {
            asin: {
                [Op.like]: req_asin
            },
            [Op.or]: [{productName: {[Op.like]: req_keyword }}, {productDescription: {[Op.like]: req_keyword }}],
            group: {
                [Op.like]: req_group
            },
        }
    }).then(products => {
        if(products.length != 0) {
            res.json({"product": products});
        }
        else{
            res.json({"message": "There are no products that match that criteria"});
        }
    })
};
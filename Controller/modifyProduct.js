var Product = require('../Model/Product');
module.exports = function (req, res) {
    if(req.session.loginUser) {
        if(req.session.loginUser === "jadmin") {
            Product.findOne({
                where: {
                    asin: req.body.asin
                }
            }).then(product => {
                if(product != null) {
                    var updateProduct = {
                        asin: req.body.asin,
                        productName: req.body.productName,
                        productDescription: req.body.productDescription,
                        group: req.body.group
                    };
                    product.update(updateProduct).then(function(item){
                        res.json({"message": product.productName + " was successfully updated"});
                    }).catch(function (err) {
                        if(err){
                            res.json({"message": "The input you provided is not valid"});
                        }
                    });
                }
                else {
                    res.json({"message": "The input you provided is not valid"});
                }
            })
        }
        else {
            res.json({"message": "You must be an admin to perform this action"});
        }
    }
    else{
        res.json({"message": "You are not currently logged in"});
    }
};
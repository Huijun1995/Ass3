var Purchased = require('../Model/Purchased');
var Product = require('../Model/Product');
var productPairs = require('../Model/productPairs');
module.exports = async function (req, res) {
    if(req.session.loginUser) {
        let username = req.session.loginUser;
        let input = req.body.products;
        let arr = input.map((item) => item.asin);
        console.log("*********************");
        console.log(arr);

        let uniqueArray = Array.from(new Set(arr));
        console.log("*********************");
        console.log(uniqueArray);
        let checkres = await checkProduct(uniqueArray);
        if(checkres) {
            await addProduct(arr, username);
            await addPairs(uniqueArray);
            res.json({"message": "The action was successful"})
        }
        else {
            res.json({"message": "There are no products that match that criteria"});
        }
    }
    else{
        res.json({"message": "You are not currently logged in"});
    }
};

async function checkProduct (input) {
    for(let i=0; i<input.length; i++) {
        let asin = input[i]
        let product;
        product = await Product.findAll({
            where: {
                asin: asin
            }});
        if(product.length === 0) {
            return false;
        }
    }
    return true;
}

async function addProduct (input, username) {
    for(let i=0; i<input.length; i++) {
        let asin = input[i];
        await Purchased.create({
            username: username,
            asin: asin
        });
    }
}

async function addPairs(input) {
    for(let i=0; i<input.length-1; i++) {
        for(let j=i+1; j<input.length; j++) {
            await productPairs.bulkCreate([
                {asin1: input[i], asin2: input[j]},
                {asin1: input[j], asin2: input[i]},
            ]).catch(function (err) {
                if(err){
                    console.log(err);
                }
            });
        }
    }
}
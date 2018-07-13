var User = require('../Model/User');
module.exports = function (req, res) {
    var name = req.body.fname;
    User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(function(item){
        res.json({"message": name + " was registered successfully"});
    }).catch(function (err) {
        if(err){
            res.json({"message": "The input you provided is not valid"});
        }
    });
};

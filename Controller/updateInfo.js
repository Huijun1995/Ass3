var User = require('../Model/User');
module.exports = function(req, res) {
    if(req.session.loginUser){
        User.findOne({
            where: {
                username: req.session.loginUser
            }
        }).then(user => {
            var updateUser = {
                fname: req.body.fname==="" ? user.fname : req.body.fname,
                lname: req.body.lname==="" ? user.lname : req.body.lname,
                address: req.body.address==="" ? user.address : req.body.address,
                city: req.body.city==="" ? user.city : req.body.city,
                state: req.body.state==="" ? user.state : req.body.state,
                email: req.body.email==="" ? user.email : req.body.email,
                username: req.body.username==="" ? user.username : req.body.username,
                password: req.body.password==="" ? user.password : req.body.password,
                zip: req.body.zip==="" ? user.zip : req.body.zip
            };
            user.update(updateUser).then(function(item){
                req.session.loginUser = user.username;
                res.json({"message": user.fname + " your information was successfully updated"});
            }).catch(function (err) {
                if(err){
                    res.json({"message": "The input you provided is not valid"});
                }
            });
        });
    }
    else{
        res.json({"message": "You are not currently logged in"});
    }
};
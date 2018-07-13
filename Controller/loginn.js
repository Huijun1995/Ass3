var User = require('../Model/User');
module.exports = function(req, res){
    console.log(req.body);
    if(req.body) {
        if(req.body.username && req.body.password) {
            User.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            }).then(user => {
                if(user != null) {
                    req.session.regenerate(function(err) {
                        if(err){
                            return res.json({"message": "login failed"});
                        }
                        req.session.loginUser = user.username;
                        res.json({"message": "Welcome " + user.fname});
                    });
                }
                else {
                    res.json({"message": "There seems to be an issue with the username/password combination that you entered"});
                }
            })
        }
        else{
            res.json({"message": "There seems to be an issue with the username/password combination that you entered"});
        }
    }
    else{
        res.json({"message": "post request error"});
    }
};
require('../app')
module.exports = function (req, res) {
    if(req.session.loginUser){
        req.session.destroy();
        res.json({"message": "You have been successfully logged out"});
    }
    else{
        res.json({"message": "You are not currently logged in"});
    }
};
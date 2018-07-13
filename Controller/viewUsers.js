var User = require('../Model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = function (req, res) {
    if(req.session.loginUser) {
        if(req.session.loginUser === "jadmin") {
            var req_fname;
            var req_lname;

            if(req.body.fname && req.body.fname != ''){
                req_fname = req.body.fname;
            }
            else {
                req_fname = '%%';
            }

            if(req.body.lname && req.body.lname != ''){
                req_lname = req.body.lname;
            }
            else {
                req_lname = '%%';
            }

            User.findAll({
                attributes: ['fname', 'lname', ['username', 'userId']],
                    where: {
                    fname: {
                        [Op.like]: req_fname
                    },
                    lname: {
                        [Op.like]: req_lname
                    },
                    username: {
                        [Op.ne]: 'jadmin'
                    }
                }
            }).then(users => {
                if(users.length != 0) {
                    res.json({"message": "The action was successful", "user": users});
                }
                else{
                    res.json({"message": "There are no users that match that criteria"});
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
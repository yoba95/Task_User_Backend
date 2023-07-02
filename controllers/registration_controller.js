const User = require('../models').User;

module.exports = {
    new: function(req, res){
        res.render('registrations/new');
    },
    create: function(req, res){
        let data = {
            email: req.body.email,
            password_hash: req.body.password_hash
            //password: req.body.password
        };
        console.log(data);
        User.create(data).then(result => {
            res.json(result);
        }).catch(err=>{
            res.json(err.message);
        });
    }
};
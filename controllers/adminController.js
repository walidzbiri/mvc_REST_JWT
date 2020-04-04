// UserController.js
// Import User model
Admin = require('../models/adminModel');
var bcrypt = require('bcryptjs');

exports.new = function(req, res) {
    const saltRounds = 10;
    let new_admin=new Admin(req.body);
    let mdpclair=req.body.password;
    bcrypt.hash(mdpclair, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err)
            console.log(err)
        new_admin.password=hash;
        console.log(hash);
        //handles null error 
            if(!new_admin.username || !new_admin.password){
                res.status(400).send({ error:true, message: 'Please provide more info' });
             }
            else{
            Admin.createAdmin(new_admin, function(err, admin) { 
                if (err)
                    res.send(err);
                    res.json(admin);
                }
            );
            }
    });
};



exports.getAdmin = function(req, res) {
    Admin.login(req.body, function (err, token) {
           if (err)
               res.send(err);
            res.cookie('jwt_token', token, {
                expires: new Date(Date.now() + 10000),
                secure: false, // set to true if your using https
                httpOnly: true,
        });
            res.send('Check your cookies. One should be in there now');
       });
};
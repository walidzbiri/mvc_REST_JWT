// UserController.js
// Import User model
User = require('../models/userModel');

// Handle index actions
exports.view = function (req, res) {
    User.getAllUsers(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

// Handle view User info
exports.index = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {// if you want to use path params
     // User.findById(req.query.User_id, function (err, User) { if you want to use query params
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};



exports.new = function(req, res) {
    var new_user = new User(req.body);
    //handles null error 
     if(!new_user.name || !new_user.email || !new_user.age){
              res.status(400).send({ error:true, message: 'Please provide more info' });
    }
     else{
        User.createUser(new_user, function(err, user) { 
            if (err)
                res.send(err);
                res.json(user);
            }
        );
    }
};

exports.delete_a_user = function(req, res) {
    User.remove( req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};

exports.update_a_user = function(req, res) {
    User.updateById(req.params.user_id, new User(req.body), function(err, User) {
      if (err)
        res.send(err);
        res.json(User);
    });
  };
  
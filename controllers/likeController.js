// LikeController.js
// Import Like model
Like = require('../models/likeModel');

// Handle index actions
exports.view = function (req, res) {
    Like.getAllLikes(function (err, likes) {
        if (err) {
            res.json({
                status: "error",
                like: err,
            });
        }
        res.json({
                status: "success",
                Like: "Likes retrieved successfully",
                data: likes
        });
    });
};

// Handle view Like info
exports.index = function (req, res) {
    Like.findById(req.params.like_id, function (err, like) {// if you want to use path params
     // Like.findById(req.query.Like_id, function (err, Like) { if you want to use query params
        if (err)
            res.send(err);
        res.json({
            Like: 'like details loading..',
            data: like
        });
    });
};



exports.new = function(req, res) {
    req.body.user_id=req.params.user_id;
    req.body.message_id=req.params.message_id;
    var new_like = new Like(req.body);
    //handles null error 
     if(!new_like.user_id || !new_like.message_id){
              res.status(400).send({ error:true, like: 'Please provide more info' });
    }
     else{
        Like.createLike(new_like, function(err, like) { 
            if (err)
                res.send(err);
                res.json(like);
            }
        );
    }
};


exports.delete_a_Like = function(req, res) {
    Like.remove( req.params, function(err, like) {
      if (err)
        res.send(err);
        res.json(like.message);
    });
};  
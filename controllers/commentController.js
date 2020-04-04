// CommentController.js
// Import Comment model
Comment = require('../models/commentModel');

// Handle index actions
exports.view = function (req, res) {
    Comment.getAllComments(function (err, comments) {
        if (err) {
            res.json({
                status: "error",
                comment: err,
            });
        }
        res.json({
                status: "success",
                comment: "Comments retrieved successfully",
                data: comments
        });
    });
};

// Handle view Comment info
exports.index = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {// if you want to use path params
     // Comment.findById(req.query.Comment_id, function (err, Comment) { if you want to use query params
        if (err)
            res.send(err);
        res.json({
            comment: 'Comment details loading..',
            data: comment
        });
    });
};



exports.new = function(req, res) {
    req.body.user_id=req.params.user_id;
    req.body.message_id=req.params.message_id;
    var new_comment = new Comment(req.body);
    //handles null error 
     if(!new_comment.user_id || !new_comment.message_id || !new_comment.contenu){
              res.status(400).send({ error:true, comment: 'Please provide more info' });
    }
     else{
        Comment.createComment(new_comment, function(err, comment) { 
            if (err)
                res.send(err);
                res.json(comment);
            }
        );
    }
};


exports.delete_a_comment = function(req, res) {
    Comment.remove( req.params, function(err, comment) {
      if (err)
        res.send(err);
        res.json(comment);
    });
};



exports.update_a_comment = function(req, res) {
    Comment.updateById(req.params, new Comment(req.body), function(err, comment) {
      if (err)
        res.send(err);
        res.json(comment);
    });
  };
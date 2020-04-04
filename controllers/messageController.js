// MessageController.js
// Import Message model
Message = require('../models/messageModel');

// Handle index actions
exports.view = function (req, res) {
    Message.getAllMessages(function (err, messages) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
                status: "success",
                message: "Messages retrieved successfully",
                data: messages
        });
    });
};

// Handle view Message info
exports.index = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {// if you want to use path params
     // Message.findById(req.query.Message_id, function (err, Message) { if you want to use query params
        if (err)
            res.send(err);
        res.json({
            message: 'Message details loading..',
            data: message
        });
    });
};



exports.new = function(req, res) {
    req.body.user_id=req.params.user_id;
    var new_message = new Message(req.body);
    //handles null error 
     if(!new_message.user_id || !new_message.contenu){
              res.status(400).send({ error:true, message: 'Please provide more info' });
    }
     else{
        Message.createMessage(new_message, function(err, message) { 
            if (err)
                res.send(err);
                res.json(message);
            }
        );
    }
};


exports.delete_a_message = function(req, res) {
    Message.remove( req.params, function(err, message) {
      if (err)
        res.send(err);
        res.json(message);
    });
};


exports.update_a_message = function(req, res) {
    Message.updateById(req.params, new Message(req.body), function(err, message) {
      if (err)
        res.send(err);
        res.json(message);
    });
  };
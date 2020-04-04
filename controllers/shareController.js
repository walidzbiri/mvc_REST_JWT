// ShareController.js
// Import Share model
Share = require('../models/shareModel');

// Handle index actions
exports.view = function (req, res) {
    Share.getAllShares(function (err, shares) {
        if (err) {
            res.json({
                status: "error",
                share: err,
            });
        }
        res.json({
                status: "success",
                share: "Shares retrieved successfully",
                data: shares
        });
    });
};

// Handle view Share info
exports.index = function (req, res) {
    Share.findById(req.params.share_id, function (err, share) {// if you want to use path params
     // Share.findById(req.query.Share_id, function (err, Share) { if you want to use query params
        if (err)
            res.send(err);
        res.json({
            share: 'Share details loading..',
            data: share
        });
    });
};



exports.new = function(req, res) {
    req.body.user_id=req.params.user_id;
    req.body.message_id=req.params.message_id;
    var new_share = new Share(req.body);
    //handles null error 
     if(!new_share.message_id || !new_share.user_id){
              res.status(400).send({ error:true, share: 'Please provide more info' });
    }
     else{
        Share.createShare(new_share, function(err, share) { 
            if (err)
                res.send(err);
                res.json(share);
            }
        );
    }
};


exports.delete_a_share = function(req, res) {
    Share.remove( req.params, function(err, share) {
      if (err)
        res.send(err);
        res.json(share);
    });
};  
var sql = require('../db.js');

//Contact object constructor
var Comment = function(comment){
    this.contenu = comment.contenu;
    this.user_id = comment.user_id;
    this.message_id = comment.message_id;
};


Comment.getAllComments = function (result) {
    sql.query("Select * from comments", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('Comments : ', res);  
                result(null, res);
            }
        });   
};


Comment.findById = function (commentId, result) {
    sql.query("Select * from comments where id = ? ", commentId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

Comment.createComment = function (newComment, result) {    
    sql.query("INSERT INTO comments set ?", newComment, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

Comment.remove = function(params, result){
    sql.query("DELETE FROM comments WHERE id = ? AND user_id = ? AND message_id = ?", [params.comment_id,params.user_id,params.message_id], function (err, res) {
               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                    result(null, res);
               }
           }); 
};

Comment.updateById = function(params, comment, result){
    sql.query("UPDATE comments SET contenu = ? WHERE id = ? AND user_id = ? AND message_id = ?", [comment.contenu, params.comment_id,params.user_id,params.message_id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };


module.exports=Comment;
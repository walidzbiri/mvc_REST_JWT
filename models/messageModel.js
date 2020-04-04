var sql = require('../db.js');

//Contact object constructor
var Message = function(message){
    this.contenu = message.contenu;
    this.user_id = message.user_id;
};


Message.getAllMessages = function (result) {
    sql.query("Select * from messages", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('Messages : ', res);  
                result(null, res);
            }
        });   
};


Message.findById = function (messageId, result) {
    sql.query("Select * from messages where id = ? ", messageId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

Message.createMessage = function (newMessage, result) {    
    sql.query("INSERT INTO messages set ?", newMessage, function (err, res) {
            
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

Message.remove = function(params, result){
    sql.query("DELETE FROM messages WHERE id = ? AND user_id = ?", [params.message_id,params.user_id], function (err, res) {
               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                    result(null, res);
               }
           }); 
};

Message.updateById = function(params, message, result){
    sql.query("UPDATE messages SET contenu = ? WHERE id = ? AND user_id = ?", [message.contenu, params.message_id,params.user_id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };


module.exports=Message;
var sql = require('../db.js');

//Contact object constructor
var User = function(user){
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
};


User.getAllUsers = function (result) {
    sql.query("Select * from users", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('users : ', res);  
             result(null, res);
            }
        });   
};


User.findById = function (userId, result) {
    sql.query("Select * from users where id = ? ", userId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

User.createUser = function (newUser, result) {    
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {
            
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

User.remove = function(id, result){
    sql.query("DELETE FROM users WHERE id = ?", id, function (err, res) {
               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                   result(null, res);
               }
           }); 
};


User.updateById = function(id, user, result){
    sql.query("UPDATE users SET name = ? , age = ? , email = ? WHERE id = ?", [user.name,user.age,user.email, id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };


module.exports=User;
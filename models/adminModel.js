var sql = require('../db.js');
var bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


//Contact object constructor
var Admin = function(admin){
    this.username = admin.username;
    this.password = admin.password;
};


Admin.createAdmin = function (newAdmin, result) {    
    sql.query("INSERT INTO admins set ?", newAdmin, function (err, res) {
            
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



Admin.login = function (newAdmin, result) { 
        sql.query("Select * from admins where username = ?", newAdmin.username, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                bcrypt.compare(newAdmin.password, JSON.parse(JSON.stringify(res[0])).password,function(err, etat_login) {
                    if(etat_login==true){
                        const token = jwt.sign({ username:newAdmin.username },process.env.jwt_secret, {
                            expiresIn: 165346753456345635457435
                          });
                        result(null,token);
                        }
                        
                    else{
                        result(null,"Login NOT successful");
                    }
                });
            }
        });
};




module.exports=Admin;
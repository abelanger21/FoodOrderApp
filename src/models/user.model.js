'use strict';
var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');
const {DATETIME} = require("mysql/lib/protocol/constants/types");
const saltRounds = 10;

//User object create
var User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.pwd = user.pwd;
    this.email = user.email;
    this.created_at = new Date();
    this.updated_at = new Date();
};
User.create = function (user, result) {

    //encrypt password
    bcrypt.hash(user.pwd, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        user.pwd=hash;
        dbConn.query("INSERT INTO user set ?", user, function (err, res) {
            if (err) {
                console.log("errors: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
                // result(null, user.email);
            }
        });
    });

    
};

User.login = function (email,password, result) {
    var sql="Select * from user where email = ? ";
    sql="SELECT * FROM `user` WHERE user.email = ?"
    dbConn.query(sql, email, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            
            if(res.length==0){result(err, null); } //invalid email
            else{
             bcrypt.compare(password, res[0].pwd, function(err, result_) {
                 
                 if (result_==true) {
                     // password is valid
                     result(null, res[0]);
                 }else{
                     result(err, null);
                 }
                 });
             }   
         }
     });
};


User.findByEmail = function (id, result) {
    dbConn.query("SELECT * FROM user WHERE user.email= ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


User.findById = function (id, result) {
    dbConn.query("Select * FROM user WHERE uid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.findAll = function (result) {
    dbConn.query("SELECT * FROM user", function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            console.log('user : ', res);
            result(null, res);
        }
    });
};


User.update = function (user, result) {
    console.log(user)
    dbConn.query("UPDATE user SET firstname=?,lastname=? WHERE email = ?", [user.firstname, user.lastname, user.email], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

User.updatePwd = function (pwd, email, result) {
    
    bcrypt.hash(pwd, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        
        dbConn.query("UPDATE user SET pwd=? WHERE email = ?", [hash,  email], function (err, res) {
            if (err) {
                console.log("errors: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
      
    });
    
   
};

User.deleteByEmail = function (email, result) {
    dbConn.query("DELETE FROM user WHERE email = ?", [email], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = User;
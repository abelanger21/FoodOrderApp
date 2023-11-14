'use strict';
const User = require('../models/user.model');
const jwt = require("jsonwebtoken")
require("dotenv");
const crypto = require("crypto");

const Max_Age = 3 * 24 * 60 * 60;
const secretKey = process.env.JWT_SECRET || 'your_secret_key'; 

const createToken = (id) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: Max_Age
    })
}

exports.login = function (req, res) {
    
    const { email, password } = req.body;
    
    User.login(email, password, function (err, user) {
        try{
            if (user==null){
                res.status(401).json({ errors:true, message: "Invalid username/password"});
            }else{
                const token = createToken(user.email);
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: Max_Age * 1000,
                });
                delete user.id
                delete user.password
          
            if(user.status==0){
                res.status(401).json({ errors:true, message: "Your access to this account has been restricted. contact the admin"});
            }else{
                res.status(200).json({ errors:false,token:token, user: user.email, data:user});
            }

    
            }
        }catch (err) {
            console.log(err)
           
            res.status(401).json({ errors:true, message: "error creating user" });
        }
    });
};


exports.create = function (req, res) {
   
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
        return;
    } 
    // let data = {
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     email: req.body.email,
    //     role: process.env.ROLE_EMPLOYEE,
    //     password: "_default_password"
    // };
    // const user = new User(data);
    const user = new User(req.body)
    
    //check if user exist
    User.findByEmail(user.email, function (err, user_) {
        if (err){
            res.status(401).json({ errors:true, message: "An unknown error has occured"});
            return;
        }
        if(user_.length>0){
            res.status(401).json({ errors:true, message: "Email already exists"});
        }else{

            User.create(user, function (err, userId) {
                if (err){
                    console.log(err);
                    res.status(401).json({ errors:true, message: "An unknown error has occured"});
                }else{
                
                    res.status(200).json({ errors: false, user: user, message: "User added successfully!" });    
                    
                  
                }
            });
        
           
        }
       
        
    });


    
  
};



exports.update = function (req, res) {
    // console.log("body update emp", req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
    } else {
        User.update(new User(req.body), function (err, user) {
            if (err)
                res.send(err);
            res.json({ errors: false, message: 'User successfully updated' });
        });
    }
};
exports.deleteByEmail = function (req, res) {
    User.deleteByEmail(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({ errors: false, message: 'User successfully deleted' });
    });
};



// Create a unique token using crypto and the user's email
function generateToken(email) {
    const secret = 'your_secret_key'; // Replace with a secure secret key
    const data = email; // You can include more data if needed
    const hash = crypto.createHmac('sha256', secret)
                       .update(data)
                       .digest('hex');
    return hash;
  }





 exports.updatePassword = function (req, res) {
    const {email, pwd}= req.body;
    User.updatePwd(pwd, email, function (err, result) {
        if (err){
            res.send(err);
        }
        if (result.affectedRows === 1) {
            res.status(200).send({ errors: false, message: "password update successful" })
        }else{
            res.status(200).send({ errors: true, message: "password update failed" })
        }
        
    });
};

exports.findAll = function (req, res) {
   
    User.findAll(function (err, users) {
        
        if (err)
            res.send(err);
       
        res.status(200).json({errors: false, data:users});
    });
};


exports.findById = function (req, res) {
    var id=req.params.id
    User.findById(id, function (err, users) {
        
        if (err)
            res.send(err);
       
        res.status(200).json({errors: false, data:users});
    });
};

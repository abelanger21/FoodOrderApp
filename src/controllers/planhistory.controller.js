'use strict';
const Planhistory = require('../models/planhistory.model');
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


exports.create = function (req, res) {
   
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
        return;
    } 
    let data = {
        userid: req.body.userid, 
        planid: req.body.planid, 
        startdate: req.body.startdate, 
        enddate: req.body.enddate,
        amount: req.body.amount,
        paymentdate: req.body.paymentdate,
        role: process.env.ROLE_EMPLOYEE,  
    };
    const planhistory = new Planhistory(data);
    
    //check if plan history exist
    Planhistory.findById(planhistory.historyid, function (err, planhistory_) {
        if (err){
            res.status(401).json({ errors:true, message: "An unknown error has occured"});
            return;
        }
        if(planhistory_.length>0){
            res.status(401).json({ errors:true, message: "Plan Id already exists"});
        }else{

            Planhistory.create(planhistory, function (err, historyid) {
                if (err){
                    console.log(err);
                    res.status(401).json({ errors:true, message: "An unknown error has occured"});
                }else{
                
                    res.status(200).json({ errors: false, planhistory: planhistory, message: "Plan record added successfully!" });    
                    
                  
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
        Planhistory.update(req.body.id, new Planhistory(req.body), function (err, planhistory) {
            if (err)
                res.send(err);
            res.json({ errors: false, message: 'Plan History successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    Planhistory.delete(req.params.id, function (err, planhistory) {
        if (err)
            res.send(err);
        res.json({ errors: false, message: 'Plan History successfully deleted' });
    });
};



// Create a unique token using crypto and the plan history's email
function generateToken(email) {
    const secret = 'your_secret_key'; // Replace with a secure secret key
    const data = email; // You can include more data if needed
    const hash = crypto.createHmac('sha256', secret)
                       .update(data)
                       .digest('hex');
    return hash;
  }

exports.findAll = function (req, res) {
   
    Planhistory.findAll(function (err, planhistory) {
        
        if (err)
            res.send(err);
       
        res.status(200).json({errors: false, data:planhistory});
    });
};


exports.findById = function (req, res) {
    var id=req.params.id
    Planhistory.findById(id, function (err, planhistory) {
        
        if (err)
            res.send(err);
       
        res.status(200).json({errors: false, data:planhistory});
    });
};
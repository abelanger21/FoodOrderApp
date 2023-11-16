'use strict';
const Mealplan = require('../models/mealplan.model');
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
        planname: req.body.planname, 
        status: req.body.status, 
        nummeals: req.body.nummeals, 
        price: req.body.price,
        description: req.body.description,
        role: process.env.ROLE_EMPLOYEE,  
    };
    const mealplan = new Mealplan(data);
    
    //check if mealplan exist
    Mealplan.findById(mealplan.planid, function (err, mealplan_) {
        if (err){
            res.status(401).json({ errors:true, message: "An unknown error has occured"});
            return;
        }
        if(mealplan_.length>0){
            res.status(401).json({ errors:true, message: "Plan Id already exists"});
        }else{

            Mealplan.create(mealplan, function (err, planid) {
                if (err){
                    console.log(err);
                    res.status(401).json({ errors:true, message: "An unknown error has occured"});
                }else{
                
                    res.status(200).json({ errors: false, mealplan: mealplan, message: "Mealplan added successfully!" });    
                    
                  
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
        Mealplan.update(req.body.id, new Mealplan(req.body), function (err, mealplan) {
            if (err)
                res.send(err);
            res.json({ errors: false, message: 'Mealplan successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    Mealplan.delete(req.params.id, function (err, mealplan) {
        if (err)
            res.send(err);
        res.json({ errors: false, message: 'Mealplan successfully deleted' });
    });
};



// Create a unique token using crypto and the mealplan's email
function generateToken(email) {
    const secret = 'your_secret_key'; // Replace with a secure secret key
    const data = email; // You can include more data if needed
    const hash = crypto.createHmac('sha256', secret)
                       .update(data)
                       .digest('hex');
    return hash;
  }

exports.findAll = function (req, res) {
   
    Mealplan.findAll(function (err, mealplan) {
        
        if (err)
            res.send(err);
       
        res.status(200).json({errors: false, data:mealplan});
    });
};


exports.findById = function (req, res) {
    var id=req.params.id
    Mealplan.findById(id, function (err, mealplan) {
        
        if (err)
            res.send(err);
       
        res.status(200).json({errors: false, data:mealplan});
    });
};
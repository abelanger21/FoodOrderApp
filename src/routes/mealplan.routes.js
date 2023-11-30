const express = require('express');
const router = express.Router();
const mealplanController = require('../controllers/mealplan.controller');
const {verifyToken} = require("../middlewares/auth");

//get all users  
router.get('/', verifyToken, mealplanController.findAll);

//fetch all
router.get('/:id', verifyToken, mealplanController.findById);

//create 
router.post("/create", verifyToken, mealplanController.create);

// Updates the employee
router.put('/update', verifyToken, mealplanController.update);

// deletes the mealplan
router.put('/delete', verifyToken, mealplanController.delete);



module.exports = router
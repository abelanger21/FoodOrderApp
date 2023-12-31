const express = require('express');
const router = express.Router();
const mealplanController = require('../controllers/mealplan.controller');

//get all users  
router.get('/', mealplanController.findAll);

//fetch all
router.get('/:id', mealplanController.findById);

//create 
router.post("/create", mealplanController.create);

// Updates the employee
router.put('/update', mealplanController.update);

// deletes the mealplan
router.put('/delete', mealplanController.delete);



module.exports = router
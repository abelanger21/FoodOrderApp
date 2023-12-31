const express = require('express')
const router = express.Router()
const planhistoryController = require('../controllers/planhistory.controller');

//get all plan histories
router.get('/', planhistoryController.findAll);

//fetch all
router.get('/:id', planhistoryController.findById);

//create 
router.post("/create", planhistoryController.create);

// Updates the plan history
router.put('/update', planhistoryController.update);

// deletes the plan history
router.put('/delete', planhistoryController.delete);



module.exports = router
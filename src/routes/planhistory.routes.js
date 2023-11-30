const express = require('express')
const router = express.Router()
const planhistoryController = require('../controllers/planhistory.controller');
const {verifyToken} = require("../middlewares/auth");

//get all plan histories
router.get('/',verifyToken, planhistoryController.findAll);

//fetch all
router.get('/:id', verifyToken, planhistoryController.findById);

//create 
router.post("/create", verifyToken, planhistoryController.create);

// Updates the plan history
router.put('/update', verifyToken, planhistoryController.update);

// deletes the plan history
router.put('/delete', verifyToken, planhistoryController.delete);



module.exports = router
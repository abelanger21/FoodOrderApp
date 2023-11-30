const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyToken} = require("../middlewares/auth");

//get all users  
// router.get('/',verifyToken, userController.findAll);
router.get('/', verifyToken, userController.findAll);
//fetch all
router.get('/:id', verifyToken, userController.findById);

//login  
router.post("/", userController.login);

//login  
router.post("/create", verifyToken, userController.create);

// Update password
router.post('/change_password', verifyToken, userController.updatePassword);

// Updates the employee
router.put('/update', verifyToken, userController.update);



module.exports = router
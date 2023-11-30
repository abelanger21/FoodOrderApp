const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const {verifyToken} = require("../middlewares/auth");

router.get('/', verifyToken, orderController.findAll);

router.get('/:id', verifyToken, orderController.findById);

router.get('/by_user/:id', verifyToken, orderController.findByUserId);

router.post("/create", verifyToken, orderController.create);

router.put('/update/:id', verifyToken, orderController.update);

module.exports = router
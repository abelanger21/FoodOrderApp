const express = require('express');
const router = express.Router();
const orderFoodController = require('../controllers/order_food.controller');
const {verifyToken} = require("../middlewares/auth");

router.get('/', orderFoodController.findAll);

router.get('/:id', orderFoodController.findById);

router.get('/by_user/:id', orderFoodController.findByOrderId);

router.get('/by_user/:id', orderFoodController.findByMenuId);

router.post("/create", orderFoodController.create);

router.put('/update/:id', orderFoodController.update);

module.exports = router
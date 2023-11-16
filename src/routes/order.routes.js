const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller');
const {verifyToken} = require("../middlewares/auth");

router.get('/', orderController.findAll);

router.get('/:id', orderController.findById);

router.post("/create", orderController.create)

router.put('/update/:id', orderController.update);

module.exports = router
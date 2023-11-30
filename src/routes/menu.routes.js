const express = require('express');
const router = express.Router()
const menuController = require('../controllers/menu.controller');
const {verifyToken} = require("../middlewares/auth");

router.get('/', verifyToken, menuController.findAll);

router.get('/:id', verifyToken, menuController.findById);

router.post("/create", verifyToken, menuController.create);

router.put('/update/:id', verifyToken, menuController.update);

router.put('/delete/:id', verifyToken, menuController.deleteById);

module.exports = router
const express = require('express');
const router = express.Router()
const menuController = require('../controllers/menu.controller');
const {verifyToken} = require("../middlewares/auth");

router.get('/', menuController.findAll);

router.get('/:id', menuController.findById);

router.post("/create", menuController.create);

router.put('/update/:id', menuController.update);

router.put('/delete/:id', menuController.deleteById);

module.exports = router
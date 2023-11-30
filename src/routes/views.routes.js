const express = require('express');
const router = express.Router();
const {verifyToken} = require("../middlewares/auth");


router.get('/', verifyToken, (req, res) => {
    res.sendFile(__dirname.substring(0, __dirname.length - 6) + '/views/home.html')
});

router.get('/login', (req, res) => {
    res.sendFile(__dirname.substring(0, __dirname.length - 6) + '/views/login.html')
});

module.exports = router
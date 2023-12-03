const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(__dirname.substring(0, __dirname.length - 6) + '/views/home.html')
});

router.get('/login', (req, res) => {
    res.sendFile(__dirname.substring(0, __dirname.length - 6) + '/views/login.html')
});

module.exports = router
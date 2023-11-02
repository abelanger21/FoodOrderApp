'use strict';

const mysql = require('mysql');

// local mysql db connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'dispatch_risk'
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;
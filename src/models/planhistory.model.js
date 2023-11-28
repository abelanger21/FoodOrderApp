'use strict';
var dbConn = require('../../config/db.config');

//User object create
var Planhistory = function (planhistory) {
    this.userid = planhistory.userid;
    this.planid = planhistory.planid;
    this.startdate = planhistory.startdate;
    this.enddate = planhistory.enddate;
    this.amount = planhistory.amount;
    this.paymentdate = planhistory.paymentdate;
};
Planhistory.create = function (planhistory, result) {
    dbConn.query("INSERT INTO planhistory set ?", planhistory, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
            // result(null, user.email);
        }
    });
};


Planhistory.findById = function (historyid, result) {
    dbConn.query("Select * from planhistory where historyid = ? ", historyid, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Planhistory.findAll = function (result) {
    dbConn.query("Select * from planhistory", function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            console.log('mealplans : ', res);
            result(null, res);
        }
    });
};


Planhistory.update = function (planhistory, result) {
    console.log(mealplan)
    dbConn.query("UPDATE planhistory SET userid=?,planid=?,startdate=?,enddate=?,amount=?,paymentdate=? WHERE historyid = ?", [planhistory.userid, planhistory.planid, planhistory.startdate, planhistory.enddate, planhistory.amount, planhistory.paymentdate], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Planhistory.delete = function (planhistory, result) {
    dbConn.query("DELETE FROM planhistory WHERE historyid = ?", [historyid], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Mealplan;
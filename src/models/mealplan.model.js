'use strict';
var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//User object create
var Mealplan = function (mealplan) {
    this.planname = mealplan.planname;
    this.status = mealplan.status;
    this.nummeals = mealplan.nummeals;
    this.price = mealplan.price;
    this.description = mealplan.description;
};
Mealplan.create = function (mealplan, result) {
    dbConn.query("INSERT INTO mealplan set ?", mealplan, function (err, res) {
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


Mealplan.findById = function (planid, result) {
    dbConn.query("Select * from mealplan where id = ? ", planid, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Mealplan.findAll = function (result) {
    dbConn.query("Select * from mealplan", function (err, res) {
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


Mealplan.update = function (mealplan, result) {
    console.log(mealplan)
    dbConn.query("UPDATE mealplan SET planname=?,status=?,nummeals=?,price=? WHERE planid = ?", [mealplan.planname, mealplan.status, mealplan.nummeals, mealplan.price, mealplan.email], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Mealplan.delete = function (mealplan, result) {
    dbConn.query("DELETE FROM mealplan WHERE planname = ?", [planname], function (err, res) {
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
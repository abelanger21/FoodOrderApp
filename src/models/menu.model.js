var dbConn= require('../../config/db.config');
const {DATETIME} = require("mysql/lib/protocol/constants/types");

var Menu = function (menu){
    this.foodname = menu.foodname;
    this.ingrediants = menu.ingrediants;
    this.expence = menu.expence
}

Menu.create = function (menu, result){
    dbConn.query("INSERT INTO menu set ?", menu, function (err, res) {
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
}

Menu.findById = function (id, result) {
    dbConn.query("Select * FROM menu WHERE menuid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Menu.findAll = function (result) {
    dbConn.query("SELECT * FROM menu", function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Menu.update = function (menu, id, result) {
    console.log(menu)
    dbConn.query("UPDATE menu SET foodname=?,ingrediants=?,expence=? WHERE menuid = ?", [menu.foodname, menu.ingrediants, menu.expence, id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Menu.deleteById = function (id, result) {
    dbConn.query("DELETE FROM menu WHERE menuid = ?", [id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Menu;
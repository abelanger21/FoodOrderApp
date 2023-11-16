var dbConn= require('../../config/db.config');
const {DATETIME} = require("mysql/lib/protocol/constants/types");

var Order = function (order){
    this.userid = order.userid;
    this.cdate = order.cdate;
}

Order.create = function (order, result){
    dbConn.query("INSERT INTO orders set ?", order, function (err, res) {
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

Order.findById = function (id, result) {
    dbConn.query("Select * FROM orders WHERE orderid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Order.findAll = function (result){
    dbConn.query("SELECT * FROM orders", function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            console.log('user : ', res);
            result(null, res);
        }
    });
}

Order.update = function (order, id, result) {
    console.log(order)
    dbConn.query("UPDATE orders SET userid=?,lastname=? WHERE orderid = ?", [order.userid, order.cdate, id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Order.deleteById = function (id, result) {
    dbConn.query("DELETE FROM orders WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Order;
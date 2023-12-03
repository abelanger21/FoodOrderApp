var dbConn= require('../../config/db.config');
const {DATETIME} = require("mysql/lib/protocol/constants/types");

var Order = function (userId){
    this.userid = userId;
    this.cdate = new Date();
}

Order.create = function (order, result){
    dbConn.query("INSERT INTO orders set ?", order, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
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
Order.findByUserId = function (id, result) {
    dbConn.query("Select * FROM orders WHERE userid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Order.findByUserIdWithFoods = function (id, result) {
    dbConn.query("Select * FROM orders JOIN order_foods ON orders.orderid  = order_foods.orderid JOIN menu ON menu.menuid = order_foods.menuid WHERE orders.userid = ? ORDER BY orders.cdate DESC", id, function (err, res) {
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
            console.log('order : ', res);
            result(null, res);
        }
    });
}

Order.update = function (order, id, result) {
    console.log(order)
    dbConn.query("UPDATE orders SET userid=?,cdate=? WHERE orderid = ?", [order.userid, order.cdate, id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Order.deleteById = function (id, result) {
    dbConn.query("DELETE FROM orders WHERE orderid = ?", [id], function (err, res) {
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
var dbConn= require('../../config/db.config');
const {DATETIME} = require("mysql/lib/protocol/constants/types");

var OrderFood = function (orderfood){
    this.orderid = orderfood.orderid;
    this.menuid = orderfood.menuid;
}

OrderFood.create = function (orderfood, result){
    dbConn.query("INSERT INTO order_foods set ?", orderfood, function (err, res) {
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

OrderFood.findById = function (id, result) {
    dbConn.query("Select * FROM order_foods WHERE orderfoodid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
OrderFood.findByOrderId = function (id, result) {
    dbConn.query("Select * FROM order_foods WHERE  orderid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

OrderFood.findByMenuId = function (id, result) {
    dbConn.query("Select * FROM order_foods WHERE  menuid = ? ", id, function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

OrderFood.findAll = function (result){
    dbConn.query("SELECT * FROM order_foods", function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            console.log('orderfood : ', res);
            result(null, res);
        }
    });
}

OrderFood.update = function (orderfood, id, result) {
    console.log(orderfood)
    dbConn.query("UPDATE order_foods SET orderid=?,menuid=? WHERE orderfoodid = ?", [orderfood.orderid, orderfood.menuid, id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

OrderFood.deleteById = function (id, result) {
    dbConn.query("DELETE FROM order_foods WHERE orderfoodid = ?", [id], function (err, res) {
        if (err) {
            console.log("errors: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = OrderFood;

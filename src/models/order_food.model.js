var dbConn= require('../../config/db.config');
const {DATETIME} = require("mysql/lib/protocol/constants/types");

var OrderFood = function (orderfood){
    this.orderid = orderfood.orderid;
    this.menuid = orderfood.menuid;
}

module.exports = OrderFood;
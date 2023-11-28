const OrderFood = require('../models/order_food.model');

exports.create = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
        return;
    }

    const orderfood = new OrderFood(req.body)
    OrderFood.create(orderfood, function (err, orderId) {
        if (err){
            console.log(err);
            res.status(401).json({ errors:true, message: "An unknown error has occured"});
        }else{

            res.status(200).json({ errors: false, orderfood: orderfood, message: "OrderFood added successfully!" });


        }
    });
}

exports.update = function (req, res) {
    var orderfoodid=req.params.id
    // console.log("body update emp", req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
    } else {
        OrderFood.update(new Order(req.body), orderfoodid, function (err, order) {
            if (err)
                res.send(err);
            res.json({ errors: false, message: 'Order successfully updated' });
        });
    }
};


exports.findById = function (req, res) {
    var id=req.params.id
    OrderFood.findById(id, function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.findByOrderId = function (req, res) {
    var id=req.params.id
    OrderFood.findByOrderId(id, function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.findByMenuId = function (req, res) {
    var id=req.params.id
    OrderFood.findByMenuId(id, function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.findAll = function (req, res) {

    OrderFood.findAll(function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};


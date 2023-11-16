const Order = require('../models/order.model');

exports.create = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
        return;
    }

    const order = new Order(req.body)
    Order.create(order, function (err, orderId) {
        if (err){
            console.log(err);
            res.status(401).json({ errors:true, message: "An unknown error has occured"});
        }else{

            res.status(200).json({ errors: false, order: order, message: "Order added successfully!" });


        }
    });
}

exports.update = function (req, res) {
    var orderid=req.params.id
    // console.log("body update emp", req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
    } else {
        Order.update(new Order(req.body), orderid, function (err, order) {
            if (err)
                res.send(err);
            res.json({ errors: false, message: 'Order successfully updated' });
        });
    }
};


exports.findById = function (req, res) {
    var id=req.params.id
    Order.findById(id, function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.findByUserId = function (req, res) {
    var id=req.params.id
    Order.findByUserId(id, function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.findAll = function (req, res) {

    Order.findAll(function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};


const Menu = require('../models/menu.model');
const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.findAll = function (req, res) {

    Menu.findAll(function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.findById = function (req, res) {
    var id=req.params.id
    Menu.findById(id, function (err, orders) {

        if (err)
            res.send(err);

        res.status(200).json({errors: false, data:orders});
    });
};

exports.create = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
        return;
    }

    const menu = new Menu(req.body)
    Menu.create(menu, function (err, orderId) {
        if (err){
            console.log(err);
            res.status(401).json({ errors:true, message: "An unknown error has occured"});
        }else{

            res.status(200).json({ errors: false, menu: menu, message: "Menu added successfully!" });


        }
    });
}

exports.update = function (req, res) {
    var menuid=req.params.id
    // console.log("body update emp", req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ errors: true, message: 'Please provide all required field' });
    } else {
        Menu.update(new Menu(req.body), menuid, function (err, order) {
            if (err)
                res.send(err);
            res.json({ errors: false, message: 'Menu successfully updated' });
        });
    }
};

exports.deleteById = function (req, res) {
    Menu.deleteById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({ errors: false, message: 'Menu successfully deleted' });
    });
};
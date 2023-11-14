CREATE SCHEMA FoodOrderApp;
USE FoodOrderApp;
CREATE TABLE user(
uid INT PRIMARY KEY AUTO_INCREMENT,
pwd VARCHAR(255),
firstname VARCHAR(40),
lastname VARCHAR(40)
);

CREATE TABLE mealplan(
planid INT PRIMARY KEY AUTO_INCREMENT,
planname VARCHAR(40),
status BOOLEAN,
nummeals INT,
price DOUBLE,
description VARCHAR(5000)
);

CREATE TABLE planhistory(
historyid INT PRIMARY KEY AUTO_INCREMENT,
userid INT,
planid INT,
startdate DATE,
enddate DATE,
amount DOUBLE,
paymentdate DATE,
FOREIGN KEY (userid) REFERENCES user(uid),
FOREIGN KEY (planid) REFERENCES mealplan(planid)
);

CREATE TABLE menu(
menuid INT PRIMARY KEY AUTO_INCREMENT,
foodname VARCHAR(40),
ingrediants VARCHAR(2500),
expence double
);

CREATE TABLE orders(
orderid INT PRIMARY KEY AUTO_INCREMENT,
userid INT,
cdate DATE,
FOREIGN KEY (userid) REFERENCES user(uid)
);

CREATE TABLE order_foods(
orderfoodid INT PRIMARY KEY AUTO_INCREMENT,
orderid INT,
menuid INT,
FOREIGN KEY (orderid) REFERENCES orders(orderid),
FOREIGN KEY (menuid) REFERENCES menu(menuid)
);
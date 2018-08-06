DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10, 2), 
    stock_quantity INT(100),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Face Mask Pack of 10", "Beauty & Health", 12.00, 100), 
("Camera", "Electronics", 300.00, 50), 
("Bluetooth Speaker", "Electronics", 250.00, 150), 
("Journal", "Office Products", 19.99, 300), 
("2 Pack Pens", "Art Supplies", 7.50, 200), 
("Backbpack", "Luggae & Travel Gear", 64.99, 80), 
("Chair", "Office Products", 64.99, 60), 
("Brita Dispenser", "Kitchen & Dining",  26.99, 65), 
("Tide Detergent", "Laundry", 13.28, 120),
("String Lights", "Home & Kitchen", 15.99, 150);


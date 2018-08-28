DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50),
	price DECIMAL(10,2),
	stock_quantity INTEGER,
	PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("squeaker bone", "dog", 5.00, 50), ("dry food - 30lb", "dog", 52.00, 20),
("tennis ball", "dog", 3.00, 100), ("bacon treats", "dog", 8.00, 5), ("can food - salmon", "cat", 1.50, 50), ("dry food - 10lb", "cat", 15.00, 20), ("catnip", "cat", 7.00, 30), ("fish food", "fish", 3.00, 100), ("aquarium", "fish", 120.00, 5), ("beta fish", "fish", 20.00, 20);
SELECT * FROM PRODUCTS;

SELECT product_name FROM products WHERE item_id="1";

UPDATE products SET stock_quantity="50" WHERE product_name="squeaker bone";

SELECT stock_quantity, product name FROM products WHERE item_id=

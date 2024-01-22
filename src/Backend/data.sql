CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255)
);

INSERT INTO category (category_name) VALUES
    ('Sports Shoes'),
	('Kids Shoes'),
    ('Ladies Shoes'),
	('Watches'),
	('Men Shoes'),
	('Backpacks'),
	('Bags'),
	('Kids Clothes'),
	('Hoodies'),
	('Handbags'),
	('Ladies Clothes'),
	('Men Clocthes'),
	('Ladies Shoes'),
    ('Home and Kitchen');
	
select * from category;

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    price NUMERIC,
	sale_price NUMERIC,
	image_path VARCHAR(255),
	color VARCHAR(255),
	product_size VARCHAR(255),
	description VARCHAR(255),
    category_id INT REFERENCES category(category_id)
);

INSERT INTO products (product_name, price, sale_price, image_path, color, product_size, description, category_id) VALUES
    ('Backpacks 1060', 1700, 1650, '/images/yellowbag.jpg', 'Yellow', 'Large', 'Back support with breathable mesh and integrated air-flow channels for increased comfort', 6),
	('Pyjamas Girls 054',1400,00,'/images/pinkpyjamas.jpg','Pink','7-14 yrs','Crafted from lightweight breathable jersey.',8);

SELECT * FROM products WHERE category_id=4;

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
	lname VARCHAR(255),
	phone VARCHAR(255),
	gender VARCHAR(255),
	address VARCHAR(255),
	city VARCHAR(255),
	country VARCHAR(255),
     pswd VARCHAR(255),
	dob date,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC,
    status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    subtotal NUMERIC
);

CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    product_id INT REFERENCES products(product_id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shop_admin (
    admin_id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
	lname VARCHAR(255),
	phone VARCHAR(255),
	gender VARCHAR(255),
	address VARCHAR(255),
	city VARCHAR(255),
	country VARCHAR(255),
     pswd VARCHAR(255),
	dob date,
    email VARCHAR(255) UNIQUE
);
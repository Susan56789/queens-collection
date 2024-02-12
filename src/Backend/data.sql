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
	
	UPDATE products
SET category_id = 13
WHERE category_id = 3;

DELETE FROM category
WHERE category_id = 3;
	
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


SELECT * FROM products ORDER BY product_id DESC LIMIT 10;
INSERT INTO products (product_name, price, sale_price, image_path, color, product_size, description, category_id) VALUES
    ('Jumper Suits 2pcs Set ', 4000, 00, '/images/purplejumpersuit.jpg',
	 'Purple', 'Small,Medium,Large', 'Colors: Apple Green, Brown, DK. Purple, Green, LT Pink, Peach, Sky Blue', 11),
	('Bath Robe Adults Velor 506',1700,00,'/images/bluegown.jpg',
	 'Red,Cream Grey,Navy','M,L,XL,2XL','100% Polyester Adult Bathrobes',14)
	 ;

ALTER TABLE products
ADD COLUMN quantity INT DEFAULT 1;
UPDATE products SET quantity = 1;


SELECT * FROM products;

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
Insert into customers (fname,lname,phone,gender,address,city,country,pswd,dob,email) VALUES
('susan','wairimu','+254796486115','female','Nairobi','Nairobi','Kenya','User1234.','03/11/2000','devnimoh@gmail.com');

select * from customers;

CREATE OR REPLACE FUNCTION insert_customer_from_order()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the customer already exists based on email
    IF NOT EXISTS (SELECT 1 FROM customers WHERE email = NEW.email) THEN
        INSERT INTO customers (fname, lname, phone, gender, address, city, country, pswd, dob, email)
        VALUES (NEW.user_name, '', NEW.phone, '', NEW.address, '', '', '123456', CURRENT_DATE, NEW.email);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_customer_trigger
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION insert_customer_from_order();


CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    session_id TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Using timestamp as session ID
    email VARCHAR(255),
    customer_id INT,
    product_id INT REFERENCES products(product_id),
    product_name VARCHAR(255),
    price NUMERIC,
    sale_price NUMERIC,
    image_path VARCHAR(255),
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE cart SET quantity = 1;
SELECT * FROM cart;

CREATE OR REPLACE FUNCTION create_customer_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if customer_id is NULL or not provided
    IF NEW.customer_id IS NULL THEN
        -- Check if email exists in the customers table
        IF NEW.email IS NULL THEN
            -- If email is not provided, generate a session identifier
            NEW.session_id := uuid_generate_v4();
        ELSE
            -- If email is provided, attempt to retrieve the customer_id based on the email
            INSERT INTO customers (email)
            VALUES (NEW.email)
            ON CONFLICT (email) DO NOTHING;

            SELECT customer_id INTO NEW.customer_id
            FROM customers
            WHERE email = NEW.email;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the trigger
CREATE TRIGGER trigger_create_customer_id
BEFORE INSERT ON cart
FOR EACH ROW
EXECUTE FUNCTION create_customer_id();

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


SELECT * FROM cart;


CREATE TABLE orders (
   order_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    email VARCHAR(255),
    address TEXT,
    phone VARCHAR(15),
    location VARCHAR(255),
    total_amount NUMERIC(10, 2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
	sale_price INT,
    price INT,
	email VARCHAR(255)
);

-- Create the trigger function
CREATE OR REPLACE FUNCTION insert_order_items()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert corresponding order items into order_items table
    INSERT INTO order_items (order_id, product_id, quantity, price, sale_price, email)
    SELECT NEW.order_id, ci.product_id, ci.quantity,  p.price, p.sale_price, NEW.email
    FROM cart ci
    JOIN products p ON ci.product_id = p.product_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the orders table
CREATE TRIGGER trigger_insert_order_items
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION insert_order_items();

SELECT * FROM orders;
SELECT * FROM order_items;

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    phone VARCHAR(15),
    amount NUMERIC(10, 2),
    status VARCHAR(20) DEFAULT 'pending', -- Payment status, defaulting to 'pending'
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE payments
ADD COLUMN customer_name VARCHAR(100),
ADD COLUMN email VARCHAR(100);

ALTER TABLE payments
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN order_id VARCHAR(255); 

SELECT * FROM payments;

CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(255),
    price NUMERIC,
	sale_price NUMERIC,
	image_path VARCHAR(255),
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

INSERT INTO shop_admin (fname,lname,phone,gender,city,country,pswd,dob,email) VALUES (
'susan','W','0796486115','Female','Nairobi','Kenya','Admin254','03/11/2000','susanwairimu177@gmail.com'
);

SELECT * FROM shop_admin;
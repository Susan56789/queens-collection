const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'queens',
    password: 'admin',
    port: 5432,
});

app.use(express.json());
app.use(cors());

client.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to POSTGRESQL database');

});


//ROUTES

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
    try {

        let query = 'SELECT * FROM products';
        const result = await client.query(query);
        const data = result.rows;

        res.json(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to get all categories
app.get('/api/categories', async (req, res) => {
    try {

        const result = await client.query('SELECT * FROM category');
        const data = result.rows;

        res.json(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to get products by category
app.get('/api/productsByCategory', async (req, res) => {
    const categoryId = parseInt(req.query.categoryId);

    if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid categoryId' });
    }
    try {

        const query = 'SELECT * FROM products WHERE category_id = $1';
        const result = await client.query(query, [categoryId]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to add a new product
app.post('/api/products', async (req, res) => {
    try {
        const {
            product_name,
            price,
            sale_price,
            image_path,
            color,
            product_size,
            description,
            category_id,
        } = req.body;

        const result = await client.query(
            'INSERT INTO products (product_name, price, sale_price, image_path, color, product_size, description, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [product_name, price, sale_price, image_path, color, product_size, description, category_id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding product', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get the latest 10 products
app.get('/api/products/latest', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products ORDER BY product_id DESC LIMIT 10');

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching latest products', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to add items to cart
app.post('/api/addToCart', (req, res) => {
    const product = req.body;

    const { product_name, product_id, customer_id, image_path, quantity, sale_price, price } = product;

    const sql = 'INSERT INTO cart (product_name, product_id, customer_id, image_path, quantity, sale_price, price) VALUES ($1, $2, $3, $4, $5, $6, $7)';

    client.query(sql, [product_name, product_id, customer_id, image_path, quantity, sale_price, price], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, message: 'Product added to cart' });
        }
    });
});

// Endpoint to get all items in cart
app.get('/api/allCartItems', async (req, res) => {

    try {
        const result = await client.query('SELECT * FROM cart');

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching latest products', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Endpoint to update cart 
app.post('/api/update-cart', async (req, res) => {
    try {
        const cartDataArray = req.body.cartData;
        for (const updatedCartData of cartDataArray) {
            const query = 'UPDATE cart SET quantity = $1 WHERE product_id = $2';
            await client.query(query, [updatedCartData.quantity, updatedCartData.product_id]);
        }

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to remove item from cart
app.delete('/api/removeCartItem/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        const query = 'DELETE FROM cart WHERE product_id = $1';
        const result = await client.query(query, [itemId]);

        console.log(result);

        res.status(200).send('Item removed from the cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// User registration
app.post('/api/register', async (req, res) => {
    const { email, pswd } = req.body;
    const hashedpswd = await bcrypt.hash(pswd, 10);

    try {
        await client.query('INSERT INTO customers (email, pswd) VALUES ($1, $2)', [email, hashedpswd]);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { email, pswd } = req.body;

    try {
        const result = await client.query('SELECT * FROM customers WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            res.status(401).send('Invalid credentials');
            return;
        }

        const isValidpswd = await bcrypt.compare(pswd, result.rows[0].pswd);

        if (isValidpswd) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

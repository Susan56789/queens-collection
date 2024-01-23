const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

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
        // Execute the SQL query to fetch products
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


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

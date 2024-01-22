const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
// const apiRoutes = require('./apiRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// app.use('/api', apiRoutes);


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



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

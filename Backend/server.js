const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', apiRoutes);


const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432,
});

app.use(express.json());

app.get('/api/items', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM items');
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

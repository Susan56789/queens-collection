const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

// Replace the connection string with your PostgreSQL database URL
const pool = new Pool({
    connectionString: 'your_postgresql_connection_string',
});

// Sample route
router.get('/data', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM your_table_name');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
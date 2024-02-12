module.exports = (app, client) => {

    // Endpoint to handle MPesa payment submissions
    app.post('/api/mpesa/payment', async (req, res) => {
        const { orderId, paymentData } = req.body;
        const { phone, amount, status, name, email } = paymentData;
        try {
            // Insert payment details into the database
            const result = await client.query(
                'INSERT INTO payments (phone, amount, status, customer_name, email, order_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING payment_id',
                [phone, amount, status, name, email, orderId]
            );

            const paymentId = result.rows[0].payment_id;

            res.status(201).json({ success: true, paymentId });
        } catch (error) {
            console.error('Error inserting payment:', error);
            res.status(500).json({ success: false, error: 'Error inserting payment' });
        }
    });

    // Define endpoint to fetch transactions
    app.get('/api/transactions', async (req, res) => {
        try {

            const result = await client.query('SELECT * FROM payments');
            res.json(result.rows); // Send JSON response with fetched data
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Endpoint to fetch transactions for a specific date range
    app.get('/api/transactions/dates', async (req, res) => {
        try {
            const { start_date, end_date } = req.query;

            // Fetch transactions from PostgreSQL
            const query = `
        SELECT * FROM payments
        WHERE payment_date >= $1 AND payment_date <= $2
      `;
            const result = await client.query(query, [start_date, end_date]);

            // Send the transactions data as JSON response
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

}
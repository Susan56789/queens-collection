module.exports = (app, client) => {

    // Endpoint to handle order submission
    app.post('/api/orders', async (req, res) => {
        const { user_name, email, address, phone, location, total_amount } = req.body;

        try {
            // Insert order details into the database and retrieve the order_id
            const result = await client.query(
                'INSERT INTO orders (user_name, email, address, phone, location, total_amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING order_id',
                [user_name, email, address, phone, location, total_amount]
            );

            const orderId = result.rows[0].order_id; // Corrected to access order_id

            res.status(201).json({ success: true, orderId });
        } catch (error) {
            console.error('Error inserting order:', error);
            res.status(500).json({ success: false, error: 'Error inserting order' });
        }
    });

    // Endpoint to fetch orders by email
    app.get('/api/orders/email/:email', async (req, res) => {
        const { email } = req.params;

        try {
            const result = await client.query('SELECT * FROM orders WHERE email = $1', [email]);
            const orders = result.rows;

            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

}
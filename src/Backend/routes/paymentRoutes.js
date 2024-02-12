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

}
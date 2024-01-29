module.exports = (app, client) => {

    // Endpoint to get data of logged in user

    app.get('/api/user-data', async (req, res) => {
        try {
            const { email } = req.query;
            const result = await client.query('SELECT * FROM customers WHERE email = $1', [email]);
            const userData = result.rows[0];

            res.json({ success: true, data: userData });
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });



}
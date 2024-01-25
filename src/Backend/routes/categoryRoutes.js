module.exports = (app, client) => {
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
}
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

    // Route handler for fetching products by category name
    app.get('/api/category/name', async (req, res) => {
        const { CategoryName } = req.query;

        try {
            const categoryResult = await client.query('SELECT category_id FROM category WHERE category_name = $1', [CategoryName]);
            const categoryId = categoryResult.rows[0].category_id;

            const productResult = await client.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);

            res.json(productResult.rows);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

}
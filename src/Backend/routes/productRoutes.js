module.exports = (app, client) => {
    // Endpoint to get all products
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

    //Endpoint to fetch selected product
    app.get('/api/product/:productName', async (req, res) => {
        const { productName } = req.params;
        const query = 'SELECT * FROM products WHERE product_name = $1';

        client.query(query, [productName], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.json(results.rows);
        });
    });

    app.get('/api/relatedProducts', async (req, res) => {
        try {
            const categoryId = parseInt(req.query.categoryId);

            if (isNaN(categoryId) || categoryId <= 0) {
                // Handle the case where categoryId is not a valid positive number
                console.error('Invalid categoryId:', req.query.categoryId);
                return res.status(400).json({ error: 'Invalid categoryId' });
            }

            const result = await client.query('SELECT * FROM products WHERE category_id = $1 LIMIT 3', [categoryId]);
            const relatedProducts = result.rows;

            res.json(relatedProducts);
        } catch (error) {
            console.error('Error fetching related products:', error.message);
            console.error(error);
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

}
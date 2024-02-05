module.exports = (app, client) => {


    app.post('/api/addToWishlist', (req, res) => {
        const product = req.body;
        const { product_name, image_path, sale_price, price } = product;

        const sql = 'INSERT INTO wishlist (product_name, image_path, sale_price, price) VALUES ($1, $2, $3, $4) RETURNING *';

        client.query(sql, [product_name, image_path, sale_price, price], (error, results) => {
            if (error) {
                console.error('Error inserting into wishlist:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                return;
            }
        });
    });

    app.get('/api/allWishlistItems', (req, res) => {

        const query = 'SELECT * FROM wishlist';
        client.query(query, (error, results) => {
            if (error) throw error;
            res.json(results.rows);
        });
    });


    app.delete('/api/removeFromWishlist/:itemId', (req, res) => {
        const itemId = req.params.itemId;
        const sql = 'DELETE FROM wishlist WHERE wishlist_id = $1';

        client.query(sql, [itemId], (error, results) => {
            if (error) {
                console.error('Error removing from wishlist:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true });
            }
        });
    });


}


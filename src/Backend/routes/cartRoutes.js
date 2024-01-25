module.exports = (app, client) => {
    // Endpoint to add items to cart
    app.post('/api/addToCart', (req, res) => {
        const product = req.body;

        const { product_name, product_id, customer_id, image_path, quantity, sale_price, price } = product;

        const sql = 'INSERT INTO cart (product_name, product_id, customer_id, image_path, quantity, sale_price, price) VALUES ($1, $2, $3, $4, $5, $6, $7)';

        client.query(sql, [product_name, product_id, customer_id, image_path, quantity, sale_price, price], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, message: 'Product added to cart' });
                console.log(results)
            }
        });
    });

    // Endpoint to get all items in cart
    app.get('/api/allCartItems', async (req, res) => {

        try {
            const result = await client.query('SELECT * FROM cart');

            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching latest products', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });




    // Endpoint to update cart 
    app.post('/api/update-cart', async (req, res) => {
        try {
            const cartDataArray = req.body.cartData;
            for (const updatedCartData of cartDataArray) {
                const query = 'UPDATE cart SET quantity = $1 WHERE product_id = $2';
                await client.query(query, [updatedCartData.quantity, updatedCartData.product_id]);
            }

            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Endpoint to remove item from cart
    app.delete('/api/removeCartItem/:itemId', async (req, res) => {
        try {
            const itemId = req.params.itemId;

            const query = 'DELETE FROM cart WHERE product_id = $1';
            const result = await client.query(query, [itemId]);

            console.log(result);

            res.status(200).send('Item removed from the cart');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
}
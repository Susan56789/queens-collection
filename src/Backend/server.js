
const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });
if (result.error) {
    throw result.error;
}


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

client.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to POSTGRESQL database');

});

//API ROUTES
require('./routes/productRoutes')(app, client);
require('./routes/cartRoutes')(app, client);
require('./routes/categoryRoutes')(app, client);
require('./routes/customerRoutes')(app, client);
require('./routes/wishlistRoutes')(app, client);
require('./routes/ordersRoutes')(app, client);
require('./routes/paymentRoutes')(app, client);


// User registration
app.post('/api/register', async (req, res) => {
    const { email, pswd } = req.body;
    const hashedpswd = await bcrypt.hash(pswd, 10);

    try {
        await client.query('INSERT INTO customers (email, pswd) VALUES ($1, $2)', [email, hashedpswd]);
        res.status(201).send('User registered successfully');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// User login
app.post('/api/login', async (req, res) => {
    try {
        const { email, pswd } = req.body;
        // Fetch user details from the database
        const result = await client.query('SELECT * FROM customers WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const user = result.rows[0];
        const DBPassword = await bcrypt.hash(user.pswd, 10);
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(pswd, DBPassword);
        if (passwordMatch) {
            // Authentication successful
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            // Authentication failed
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Admin login
app.post('/userverify', async (req, res) => {
    try {
        const { email, pswd } = req.body;
        // Fetch user details from the database
        const result = await client.query('SELECT * FROM shop_admin WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const user = result.rows[0];
        const DBPassword = await bcrypt.hash(user.pswd, 10);
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(pswd, DBPassword);
        if (passwordMatch) {
            // Authentication successful
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            // Authentication failed
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

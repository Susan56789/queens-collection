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

    // Endpoint to handle user data updates
    app.post('/api/user/update', async (req, res) => {
        // Destructure the request body to extract necessary fields
        const editedUserData = req.body;
        const { customer_id, fname, lname, gender, phone, address, city, country, dob, email } = editedUserData;
        try {
            // If customer_id is not provided, assume it's a new customer and generate a new ID
            if (!customer_id) {
                // Insert a new record
                const insertQuery = `
                INSERT INTO customers (fname, lname, gender, phone, address, city, country, dob, email)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING customer_id
            `;
                const insertValues = [fname, lname, gender, phone, address, city, country, dob, email];
                const result = await client.query(insertQuery, insertValues);

                // Retrieve the generated customer_id
                const newCustomerId = result.rows[0].customer_id;
                res.status(200).json({ message: 'User data updated successfully', customer_id: newCustomerId });
            } else {
                // Update existing record
                const updateQuery = `
                UPDATE customers
                SET fname = $1, lname = $2, gender = $3, phone = $4, address = $5, city = $6, country = $7, dob = $8
                WHERE customer_id = $9
            `;
                const updateValues = [fname, lname, gender, phone, address, city, country, dob, customer_id];
                await client.query(updateQuery, updateValues);

                res.status(200).json({ message: 'User data updated successfully', customer_id });
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Define your endpoint for updating passwords
    app.post('/api/updatePassword', async (req, res) => {
        try {
            const { email, newPassword } = req.body;

            // Perform the database query to update the password
            const result = await client.query(
                'UPDATE customers SET pswd = $1 WHERE email = $2',
                [newPassword, email]
            );

            // Check if any rows were affected
            if (result.rowCount === 1) {
                // Password updated successfully
                res.status(200).json({ message: 'Password updated successfully' });
            } else {
                // No user found with the provided email
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // POST endpoint to add a new user
    // Endpoint to check if an email exists
    app.post('/api/check-email', (req, res) => {
        const { email } = req.body;

        // Query the database to check if the email exists
        client.query('SELECT EXISTS(SELECT 1 FROM customers WHERE email = $1)', [email], (error, results) => {
            if (error) {
                console.error('Error checking email existence:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // Return the result indicating whether the email exists
            res.status(200).json({ exists: results.rows[0].exists });
        });
    });

    // Endpoint to add a new user
    app.post('/api/user', (req, res) => {
        const { fname, lname, email, phone, dob, pswd } = req.body;

        // Check if the email already exists in the database
        client.query('SELECT EXISTS(SELECT 1 FROM customers WHERE email = $1)', [email], (error, results) => {
            if (error) {
                console.error('Error checking email existence:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // If the email exists, send back an error response
            if (results.rows[0].exists) {
                res.status(400).json({ error: 'Email already in use' });
                return;
            }

            // If the email doesn't exist, insert the new user into the database
            client.query('INSERT INTO customers (fname, lname, email, phone, dob, pswd) VALUES ($1, $2, $3, $4, $5, $6)',
                [fname, lname, email, phone, dob, pswd],
                (error, results) => {
                    if (error) {
                        console.error('Error adding user:', error);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }
                    res.status(201).json({ message: 'User created successfully' });
                });
        });
    });

}
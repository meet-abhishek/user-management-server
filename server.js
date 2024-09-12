const express = require('express');
const cors = require('cors'); // To handle cross-origin requests
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests from the front-end
app.use(express.json()); // Middleware to parse JSON request bodies 

// In-memory "database" for users
let users = [];

// Endpoint to get all users
app.get('/users', (req, res) => {
    console.log('Users:', users);
    res.json(users); // Send the users array as JSON
});

// Endpoint to add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    console.log('Received data:', req.body); // Log the received data

    // Check if the "name" field is present
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    // Check if the "email" field is present
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a new user ID
    const newUser = {
        id: users.length ? Math.max(users.map(user => user.id)) + 1 : 1, // Increment ID based on existing users
        name,
        email
    };

    users.push(newUser); // Add user to the array
    res.status(201).json(newUser); // Return the newly added user
});

// Endpoint to clear all users
app.delete('/users', (req, res) => {
    users = []; // Clear the in-memory array
    res.status(200).json({ message: 'All users have been deleted' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

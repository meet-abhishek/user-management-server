const express = require('express');
const cors = require('cors'); // To handle cross-origin requests
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests from the front-end
app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory "database" for users
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Endpoint to get all users
app.get('/users', (req, res) => {
    res.json(users); // Send the users array as JSON
});

// Endpoint to add a new user
app.post('/users', (req, res) => {
    const { name } = req.body;

    // Check if the "name" field is present
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
        id: users.length + 1, // Auto-increment ID
        name
    };

    users.push(newUser); // Add user to the array
    res.status(201).json(newUser); // Return the newly added user
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

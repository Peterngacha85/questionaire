const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'questonnaire' // corrected typo in database name
});

// Serve static files from the 'public' directory
app.use(express.static('public', {
    // Set correct MIME type for .js files
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
}));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle GET requests to the root URL
app.get('/record', (req, res) => {
    // Send the record.html file as the response
    res.sendFile(path.join(__dirname, 'public', 'record.html'));
});
// Connect to MySQL
connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle form submissions
app.post('/submit-questionnaire', (req, res) => {
    const formData = req.body;

    // Insert form data into MySQL database
    const sql = 'INSERT INTO responses (name, age, gender, feedback) VALUES (?, ?, ?, ?)';
    const values = [formData.name, formData.age, formData.gender, formData.feedback];

    connection.query(sql, values, (error, result) => {
        if (error) {
            console.error('Error inserting data into MySQL:', error);
            res.status(500).json({ message: 'Error submitting questionnaire' });
            return;
        }
        console.log('Form data inserted into MySQL');
        res.status(200).json({ message: 'Questionnaire submitted successfully' });
    });
});

// Route to get all responses from the database
app.get('/responses', (req, res) => {
    // Query to select all responses from the database
    
    const sql = 'SELECT * FROM responses';

    // Execute the query
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error retrieving data from MySQL:', error);
            res.status(500).json({ message: 'Error retrieving responses' });
            return;
        }
        // Send the retrieved responses as JSON
        res.status(200).json(results);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});

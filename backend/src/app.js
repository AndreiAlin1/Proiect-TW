const express = require('express');
const cors = require('cors');
require('dotenv').config();

const thesisRoutes = require('./routes/thesisRoutes');
const professorRoutes = require('./routes/professorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/thesis', thesisRoutes);
app.use('/api/professors', professorRoutes);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
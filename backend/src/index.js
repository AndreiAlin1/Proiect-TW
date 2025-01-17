require('dotenv').config();
const app = require('./app');
const pool = require('./db');

const PORT = process.env.PORT || 3000;

// Test database connection
const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

// Start server
const startServer = async () => {
    try {
        await testConnection();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Close server & exit process
    process.exit(1);
});
// studentRoutes.js
const express = require('express');
const router = express.Router();
const {
    addStudentOAUTH,
    updateStudentDetails,
    getStudentThesis
} = require('../controllers/studentController');

// Middleware for authentication (if needed)
const authMiddleware = require('../middleware/auth');

// Route for adding a new student (after OAuth authentication)
router.post('/oauth', addStudentOAUTH);

// Route for updating student details
router.put('/:id', authMiddleware, updateStudentDetails);

// Route for retrieving student thesis information
router.get('/:id/thesis', getStudentThesis);

module.exports = router;

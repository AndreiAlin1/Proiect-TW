const express = require('express');
const router = express.Router();
const thesisController = require('../controllers/thesisController');

// POST /api/thesis - Create a new thesis
router.post('/', thesisController.addThesis);

// GET /api/thesis - Get all theses
router.get('/', thesisController.getAllTheses);

// GET /api/thesis/:id - Get a specific thesis by ID
router.get('/:id', thesisController.getThesisById);

// PATCH /api/thesis/:id/status - Update thesis status
router.patch('/:id/status', thesisController.updateThesisStatus);

// DELETE /api/thesis/:id - Delete a thesis
router.delete('/:id', thesisController.deleteThesis);

module.exports = router;
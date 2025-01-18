// professorRoutes.js
const express = require('express');
const router = express.Router();
const {
    updateProfessorDetails,
    getAllProfessors,
    getProfessorById,
    deleteProfessor
} = require('../controllers/profesorController');

// Middleware pentru verificarea autentificării (trebuie implementat)
const authMiddleware = require('../middleware/auth');

// Rute pentru profesori
router.get('/', getAllProfessors);
router.get('/:id', getProfessorById);
router.put('/:id', authMiddleware, updateProfessorDetails);
router.delete('/:id', authMiddleware, deleteProfessor);

module.exports = router;
// professorRoutes.js
const express = require('express');
const router = express.Router();
const {
    updateProfessorDetails,
    getAllProfessors,
    getProfessorById,
    deleteProfessor
} = require('../controllers/profesorController');

const authMiddleware = require('../middleware/auth');

router.get('/getAllProf', getAllProfessors);
router.get('/professor/getProf', getProfessorById);
router.put('/:id', authMiddleware, updateProfessorDetails);
router.delete('/:id', authMiddleware, deleteProfessor);

module.exports = router;
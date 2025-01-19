// professorRoutes.js
const express = require("express");
const router = express.Router();
const {
  updateProfessorDetails,
  getAllProfessors,
  getProfessorById,
  deleteProfessor,
  updateIntervalsProfessor,
  getProfessorID,
  getIntervalsProf,
} = require("../controllers/profesorController");

const authMiddleware = require("../middleware/auth");

<<<<<<< HEAD
router.get("/getAllProf", getAllProfessors);
router.get("/professor/getProf", getProfessorById);
router.put("/:id", authMiddleware, updateProfessorDetails);
router.delete("/:id", authMiddleware, deleteProfessor);
router.put("/putIntervalsProf/:id", updateIntervalsProfessor);
router.get("/getProfessorID/:email", getProfessorID);
router.get("/getIntervalsProf/:email", getIntervalsProf);
=======
router.get('/getAllProf', getAllProfessors);
router.get('/getProf/:id', getProfessorById);
router.put('/:id', authMiddleware, updateProfessorDetails);
router.delete('/:id', authMiddleware, deleteProfessor);
>>>>>>> 99fc255178d96e64772e4bb9bff8355ae59f24e1

module.exports = router;

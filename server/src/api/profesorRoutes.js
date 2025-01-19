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
router.get("/getProf/:id", getProfessorById); 
=======
router.get("/getAllProf", getAllProfessors);
router.get("/professor/getProf", getProfessorById);
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4
router.put("/:id", authMiddleware, updateProfessorDetails);
router.delete("/:id", deleteProfessor);
router.put("/putIntervalsProf/:id", updateIntervalsProfessor);
router.get("/getProfessorID/:email", getProfessorID);
router.get("/getIntervalsProf/:email", getIntervalsProf);
<<<<<<< HEAD

=======
router.get("/getAllProf", getAllProfessors);
router.get("/getProf/:id", getProfessorById);
router.put("/:id", authMiddleware, updateProfessorDetails);
router.delete("/:id", authMiddleware, deleteProfessor);
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4

module.exports = router;

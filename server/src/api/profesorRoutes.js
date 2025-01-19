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

router.get("/getAllProf", getAllProfessors);  
router.get("/getProf/:id", getProfessorById); 
router.put("/:id", authMiddleware, updateProfessorDetails);
router.delete("/:id", deleteProfessor);
router.put("/putIntervalsProf/:id", updateIntervalsProfessor);
router.get("/getProfessorID/:email", getProfessorID);
router.get("/getIntervalsProf/:email", getIntervalsProf);


module.exports = router;

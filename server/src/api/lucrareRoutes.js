const express = require("express");
const router = express.Router();
const thesisController = require("../controllers/lucrareController");

// Routes for handling thesis operations
router.post("/insertThesis/:id", thesisController.addThesis);
router.get("/getAllTheses", thesisController.getAllTheses);
router.get("/getThesis/:id", thesisController.getThesisById);
router.get("/getThesisByStudent/:id", thesisController.getThesisByStudentId); // No need to repeat this route
router.get("/getThesisByProf/:id", thesisController.getThesisByProfId);
// router.get("/getThesisStare/:id"), thesisController.getThesisStare;
router.put(
  "/updateThesisStare/:id",
  thesisController.updateThesisStareAcceptata
);

//router.get("/getThesisByStudent/:id", thesisController.getThesisByStudentId);

router.patch("/:id/status", thesisController.updateThesisStatus);
router.patch("/setThesisProf/:id", thesisController.setThesisProf);
router.delete("/:id", thesisController.deleteThesis); // Only one version of this route

router.get(
  "/getThesisTitleByStudent/:id",
  thesisController.getThesisTitleByStudentId
);

router.get(
  "/getThesisStatusByStudentId/:id",
  thesisController.getThesisStatusByStudentId
);
router.get(
  "/getThesisProfessorIdByStudentId/:id",
  thesisController.getThesisProfessorIdByStudentId
);

router.get("/getNumberOfStudents/:id", thesisController.getNumberOfStudents);

module.exports = router;

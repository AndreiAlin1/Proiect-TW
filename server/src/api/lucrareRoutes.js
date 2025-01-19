const express = require("express");
const router = express.Router();
const thesisController = require("../controllers/lucrareController");

router.post("/insertThesis/:id", thesisController.addThesis);

router.get("/getAllTheses", thesisController.getAllTheses);

router.get("/getThesis/:id", thesisController.getThesisById);

router.get("/getThesisByStudent/:id", thesisController.getThesisByStudentId);

<<<<<<< HEAD
router.get('/getThesisByStudent/:id', thesisController.getThesisByStudentId);

router.get('/getThesisByProf/:id', thesisController.getThesisByProfId);
=======
router.patch("/:id/status", thesisController.updateThesisStatus);
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4

router.patch("/setThesisProf/:id", thesisController.setThesisProf);

router.delete("/:id", thesisController.deleteThesis);

<<<<<<< HEAD
router.delete('/:id', thesisController.deleteThesis);


module.exports = router;
=======
module.exports = router;
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4

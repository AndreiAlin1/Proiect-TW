const express = require('express');
const router = express.Router();
const thesisController = require('../controllers/lucrareController');


router.post('/insertThesis/:id', thesisController.addThesis);

router.get('/getAllTheses', thesisController.getAllTheses);

router.get('/getThesis/:id', thesisController.getThesisById);

router.get('getThesisByStudent/:id', thesisController.getThesisByStudentId);

router.patch('/:id/status', thesisController.updateThesisStatus);

router.patch('/setThesisProf/:id', thesisController.setThesisProf);

router.delete('/:id', thesisController.deleteThesis);

module.exports = router;
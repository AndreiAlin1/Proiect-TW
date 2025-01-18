const express = require('express');
const router = express.Router();
const thesisController = require('../controllers/lucrareController');


router.post('/', thesisController.addThesis);

router.get('/', thesisController.getAllTheses);

router.get('/:id', thesisController.getThesisById);

router.patch('/:id/status', thesisController.updateThesisStatus);

router.delete('/:id', thesisController.deleteThesis);

module.exports = router;
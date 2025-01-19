// studentRoutes.js
const express = require('express');
const router = express.Router();
const {
    addStudentOAUTH,
    updateStudentDetails,
    updateStudentProfile,
    getStudentByThesis,
    getStudentThesis
} = require('../controllers/studentController');


router.post('/oauth', addStudentOAUTH);

router.put('/updateInfo/:id', updateStudentDetails);

router.put('/updateProfile/:id',updateStudentProfile);

router.get('/:id/thesis', getStudentThesis);

router.get('/getStudentByThesis/:id', getStudentByThesis);



module.exports = router;

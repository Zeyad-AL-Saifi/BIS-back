
const express = require('express');
const router = express.Router();
const { addNewStudentController } = require('../../controllers/auth/authController');
const { verifayTokenAndAdmin } = require('../../middlewares/token');
const photoUpload = require('../../middlewares/photoUpload');
/**
 * @DOCS add students
 * @router localhost:4500/registration/student
 * @method POST
 * @access protected
 */

const addStudent = router.post('/', verifayTokenAndAdmin, photoUpload.single("image"), addNewStudentController);




module.exports = router;


const express = require('express');
const router = express.Router();
const { addNewTeacherController } = require('../../controllers/auth/authController');
const { verifayTokenAndAdmin } = require('../../middlewares/token');
const photoUpload = require('../../middlewares/photoUpload');


/**
 * @DOCS add Teachers
 * @router localhost:4500/registration/teacher
 * @method POST
 * @access protected
 */

// photoUpload.single("image"),
const addTeachers = router.post('/', verifayTokenAndAdmin, addNewTeacherController);

module.exports = router;
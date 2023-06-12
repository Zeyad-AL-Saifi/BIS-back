

const express = require('express');
const router = express.Router();
const { loginStudentController, loginTeacherController } = require('../../controllers/auth/authController')


/**
 * @DOCS login students
 * @router localhost:4500/login/student
 * @method POST
 * @access protected
 */
const loginStudent = router.post('/student', loginStudentController)
/**
 * @DOCS login teacher and  admin
 * @router localhost:4500/login/teacher
 * @method POST
 * @access protected
 */
const loginTeacher = router.post('/teacher', loginTeacherController)



module.exports = router;
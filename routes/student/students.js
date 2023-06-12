const express = require('express');
const router = express.Router();
const client = require('../../config/db')
const { addNewStudentController, deleteStudentController, getAllStudentsController, getStudentByIDController, updateStudentController } = require('../../controllers/student/studentController');
const { verifayTokenAndAdmin } = require('../../middlewares/token');

/**
 * @DOCS get all students from database
 * @router localhost:4500/students
 * @method GET
 * @access public
 */

const getAllStudents = router.get('/', getAllStudentsController);


/**
 * @DOCS get student by id
 * @router localhost:4500/students/${id}
 * @method GET
 * @access public
 */

const getStudentById = router.get('/:id', getStudentByIDController);




/**
 * @DOCS update students
 * @router localhost:4500/students/id
 * @method PUT
 * @access protected
 */
const updateStudent = router.put('/:id', verifayTokenAndAdmin, updateStudentController)


/**
 * @DOCS delete students
 * @router localhost:4500/students/id
 * @method Delete
 * @access protected
 */
const deleteStudent = router.delete('/:id', verifayTokenAndAdmin, deleteStudentController)



module.exports = router;
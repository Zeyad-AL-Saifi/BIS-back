const express = require('express');
const router = express.Router();
const { addNewTeacherController, deleteTeacherController, getAllTeachersController, getTeacherByIDController, updateTeacherController } = require('../../controllers/teacher/teachersController');
const { verifayTokenAndAdmin } = require('../../middlewares/token');

/**
 * @DOCS get all Teachers from database
 * @router localhost:4500/teachers
 * @method GET
 * @access public
 */
const getAllTeachers = router.get('/', getAllTeachersController);




/**
 * @DOCS get Teacher by id
 * @router localhost:4500/teachers/${id}
 * @method GET
 * @access public
 */
const getTeacherById = router.get('/:id', getTeacherByIDController);











/**
 * @DOCS update teachers
 * @router localhost:4500/teachers/id
 * @method PUT
 * @access protected
 */
const updateTeachers = router.put('/:id', verifayTokenAndAdmin, updateTeacherController)





/**
 * @DOCS delete teachers
 * @router localhost:4500/teachers/id
 * @method Delete
 * @access protected
 */
const deleteTeachers = router.delete('/:id', verifayTokenAndAdmin, deleteTeacherController)



module.exports = router;
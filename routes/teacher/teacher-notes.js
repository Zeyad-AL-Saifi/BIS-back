const express = require('express');
const router = express.Router();

const { getAllTeachernoteController, getTeachernoteByIDController, addNewTeachernoteController, updateTeachernoteController, deleteTeachernoteController } = require('../../controllers/teacher/teacherNotesController')
/**
 * @DOCS get all teacher notes from database
 * @router localhost:4500/teachernote
 * @method GET
 * @access public
 */
const getAllTeachernote = router.get('/', getAllTeachernoteController);


/**
 * @DOCS get teacher notes by id
 * @router localhost:4500/teachernote/${id}
 * @method GET
 * @access public
 */
const getTeachernoteById = router.get('/:name', getTeachernoteByIDController);


/**
 * @DOCS add teacher notes notes
 * @router localhost:4500/teachernote
 * @method POST
 * @access protected
 */
const addTeachernote = router.post('/', addNewTeachernoteController)


/**
 * @DOCS update teacher notes
 * @router localhost:4500/teachernote/id
 * @method PUT
 * @access protected
 */
const updateTeachernote = router.put('/:id', updateTeachernoteController)


/**
 * @DOCS delete teacher notes
 * @router localhost:4500/teachernote/id
 * @method Delete
 * @access protected
 */
const deleteTeachernote = router.delete('/:id', deleteTeachernoteController)



module.exports = router;
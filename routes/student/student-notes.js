const express = require('express');
const router = express.Router();
const { getAllStudentnoteController, getStudentnoteByIDController, addNewStudentnoteController, updateStudentnoteController, deleteStudentnoteController } = require('../../controllers/student/studentNotesController');
/**
 * @DOCS get all student notes from database
 * @router localhost:4500/studentnote
 * @method GET
 * @access public
 */
const getAllStudentnote = router.get('/', getAllStudentnoteController);


/**
 * @DOCS get student notes by id
 * @router localhost:4500/studentnote/${id}
 * @method GET
 * @access public
 */
const getStudentnoteById = router.get('/:id', getStudentnoteByIDController);


/**
 * @DOCS add student notes notes
 * @router localhost:4500/studentnote
 * @method POST
 * @access protected
 */
const addStudentnote = router.post('/', addNewStudentnoteController)


/**
 * @DOCS update student notes
 * @router localhost:4500/studentnote/id
 * @method PUT
 * @access protected
 */
const updateStudentnote = router.put('/:id', updateStudentnoteController)


/**
 * @DOCS delete student notes
 * @router localhost:4500/studentnote/id
 * @method Delete
 * @access protected
 */
const deleteStudentnote = router.delete('/:id', deleteStudentnoteController)



module.exports = router;
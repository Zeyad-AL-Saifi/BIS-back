
const express = require('express');
const router = express.Router();
const { forgotPasswordController } = require('../../controllers/password/forgotPasswordController');


/**
 * @DOCS forgot password
 * @router localhost:4500/forot-password
 * @method POST
 * @access protected
 */
const forgotPassword = router.post('/', forgotPasswordController)


module.exports = router;
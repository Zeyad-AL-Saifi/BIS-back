
const express = require('express');
const { updatePassword } = require('../../controllers/password/resetPasswordController');
const { verifayTokenAndAuthorization } = require('../../middlewares/token');
const router = express.Router();

/**
 * @DOCS forgot password
 * @router localhost:4500/after-code
 * @method PUT
 * @access protected
 */
const ResetPassword = router.put('/:email/:token',verifayTokenAndAuthorization, updatePassword)


module.exports = router;
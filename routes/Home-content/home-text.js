const express = require('express');
const router = express.Router();
const { deleteHomeTextController, getHomeTextController, updateHomeTextController } = require('../../controllers/Home/home-text-Controller');
const { verifayTokenAndAdmin } = require('../../middlewares/token');
/**
 * @DOCS get home text
 * @router localhost:4500/home/text
 * @method GET
 * @access public
 */
const getHomeText = router.get('/', getHomeTextController);


/**
 * @DOCS update home text
 * @router localhost:4500/home/text
 * @method PUT
 * @access protected
 */
const updateHomeText = router.put('/', verifayTokenAndAdmin, updateHomeTextController)



module.exports = router;
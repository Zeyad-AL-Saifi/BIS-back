const express = require('express');
const router = express.Router();

const { getAllHomeImagesController, getHomeImagesByIDController, addNewHomeImagesController, deleteHomeImagesController } = require('../../controllers/Home/home-image-Controller');
const { verifayTokenAndAdmin } = require('../../middlewares/token');
const photoUpload = require('../../middlewares/photoUpload');
/**
 * @DOCS get all home images from database
 * @router localhost:4500/home/images
 * @method GET
 * @access public
 */

const getAllHomeImages = router.get('/', getAllHomeImagesController);


/**
 * @DOCS get home images by id
 * @router localhost:4500/home/images/${id}
 * @method GET
 * @access public
 */

const getHomeImagesById = router.get('/:id', getHomeImagesByIDController);

/**
 * @DOCS add home images
 * @router localhost:4500/home/images
 * @method POST
 * @access protected
 */
const addHomeImages = router.post('/', photoUpload.single("image"), verifayTokenAndAdmin, addNewHomeImagesController)


/**
 * @DOCS delete home images
 * @router localhost:4500/home/images/id
 * @method Delete
 * @access protected
 */
const deleteHomeImages = router.delete('/:id', verifayTokenAndAdmin, deleteHomeImagesController)



module.exports = router;
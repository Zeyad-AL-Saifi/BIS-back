const express = require('express');
const router = express.Router();

const { getAllNewsController, getNewsByIDController, addNewNewsController, updateNewsController, deleteNewsController } = require('../../controllers/Home/home-news-Controller');
const { verifayTokenAndAdmin } = require('../../middlewares/token');



/**
 * @DOCS get all news from database
 * @router localhost:4500/home/news
 * @method GET
 * @access public
 */

const getAllNews = router.get('/', getAllNewsController);


/**
 * @DOCS get news by id
 * @router localhost:4500/home/news/${id}
 * @method GET
 * @access public
 */

const getNewsById = router.get('/:id', getNewsByIDController);

/**
 * @DOCS add news
 * @router localhost:4500/home/news
 * @method POST
 * @access protected
 */
const addNews = router.post('/', verifayTokenAndAdmin, addNewNewsController)


/**
 * @DOCS update news
 * @router localhost:4500/home/news/id
 * @method PUT
 * @access protected
 */
const updateNews = router.put('/:id', verifayTokenAndAdmin, updateNewsController)


/**
 * @DOCS delete news
 * @router localhost:4500/home/news
 * @method Delete
 * @access protected
 */
const deleteNews = router.delete('/:id', verifayTokenAndAdmin, deleteNewsController)



module.exports = router;
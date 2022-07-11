const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  update,
  remove,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');




/**
 * @swagger
 * /api/product/{productId}:
 *  get:
 *     summary: Return product of specified id.
 *     description: Used to show specified id product.
 *     parameters:
 *        - in: path
 *          name: productId
 *          required: true
 *          description: String Id required
 *          schema:
 *            type: string
 *     responses: 
 *        '200':
 *          description: A successful Response
 *        '404':
 *          description: User Not Found
 *        '401':
 *          description: You are not Authorised to make changes
 *     
 *     
 */
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);


router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);


/**
 * @swagger
 * /api/products:
 *  get:
 *     summary: Return list of products.
 *     description: Used to show all the products available.
 *     responses: 
 *        '200':
 *          description: A successful Response
 *        '404':
 *          description: User Not Found
 *        '401':
 *          description: You are not Authorised to make changes
 *     
 *     
 */
router.get('/products', list);

router.get('/products/search', listSearch);

/**
 * @swagger
 * /api/products/related/{productId}:
 *  get:
 *     summary: Shows all the products of specified id with photo object.
 *     description: Used to show all the products with photo which is converted as bson
 *     parameters:
 *        - in: path
 *          name: productId
 *          required: true
 *          description: String Id required
 *          schema:
 *            type: string
 *     responses: 
 *        '200':
 *          description: A successful Response
 *        '404':
 *          description: User Not Found
 *        '401':
 *          description: You are not Authorised to make changes
 */
router.get('/products/related/:productId', listRelated);

/**
 * @swagger
 * /api/products/categories:
 *  get:
 *     summary: Return all categories.
 *     description: Used to show all the categories of different product types.
 *     responses: 
 *        '200':
 *          description: A successful Response
 *        '404':
 *          description: User Not Found
 *        '401':
 *          description: You are not Authorised to make changes
 *     
 */

router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;

const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const {
  userById,
  read,
  update,
  purchaseHistory,
  allUsers,
  deleteUser
} = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});



/**
 * @swagger
 * /api/users:
 *  get:
 *     summary: Returns a list of users
 *     description: Used to show all users
 *     responses: 
 *        '200':
 *          description: A successful Response
 *        '404':
 *          description: User Not Found
 *        '401':
 *          description: You are not Authorised to make changes
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            items:
 *              type: string
 *  
 */

router.get('/users', allUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *     summary: Deletes specified user id.
 *     description: Deletes the user with user id.
 *     parameters:
 *        - in: path
 *          name: id
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
router.delete('/users/:id', deleteUser);

router.get('/user/:userId', requireSignin, isAuth, read);

router.put('/user/:userId', requireSignin, isAuth, update);

router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById);

module.exports = router;

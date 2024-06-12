/**
 * @constant router express router method to handle routes efficiently
 */
const router = require('express').Router();
const UserController = require('../controllers/Users.controller');
const PostController = require('../controllers/Posts.controller');
const AuthMiddleware= require('../utilities/authMiddleware');

/* 
* User related API endpoints.
*/
router.post('/signup',
    (req, res) => UserController.createNewUser(req, res));

router.post('/login',
    (req, res) => UserController.loginUser(req, res));

/* 
* Blogs Post related API endpoints.
*/
router.post('/post',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => PostController.postBlog(req, res));

router.get('/posts',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => PostController.fetchAllBlogs(req, res));


module.exports = router;

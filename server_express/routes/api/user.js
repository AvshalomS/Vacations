var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/usersController');
const authMiddleware = require("../../middlewares/authMiddleware");


/* POST new user. */
router.post('/register', [authMiddleware.isGuest], usersController.register);
/* POST login user. */
router.post('/login', [authMiddleware.isGuest], usersController.login);
/* POST logout user. */
router.post('/logout', [authMiddleware.isLogin], usersController.logout);


module.exports = router;

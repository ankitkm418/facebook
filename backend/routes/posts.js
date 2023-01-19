const express = require('express');
const router = express.Router();

const userController = require('../controllers/posts');
const checkAuth = require('../middleware/check-auth');

router.post("/", userController.create_post);
// router.post("/login", userController.user_login);


module.exports = router;

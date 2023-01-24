const express = require('express');
const router = express.Router();

const userController = require('../controllers/auth');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", userController.user_signup);
router.post("/login", userController.user_login);
router.post("/refresh", userController.api_refresh);


module.exports = router;

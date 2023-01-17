const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-registration');

router.post("/signup", userController.user_signup);

module.exports = router;

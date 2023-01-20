const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.put("/:id", userController.update_user_details);


module.exports = router;

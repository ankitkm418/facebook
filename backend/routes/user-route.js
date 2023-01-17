const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-registration');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", userController.user_signup);
router.post("/login", userController.user_login);
router.post("/:userId", checkAuth, userController.user_delete);
router.get("/reset", userController.user_pwd_reset);


module.exports = router;

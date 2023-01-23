const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.put("/:id", checkAuth, userController.update_user_details);
router.delete("/:id", checkAuth, userController.delete_user_details);
router.get("/:id", checkAuth, userController.get_user_details);
router.put("/:id/follow", checkAuth, userController.follow_user);
router.put("/:id/unfollow", checkAuth, userController.unfollow_user);



module.exports = router;

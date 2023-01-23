const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.put("/:id", userController.update_user_details);
router.delete("/:id", userController.delete_user_details);
router.get("/:id", userController.get_user_details);
router.put("/:id/follow", userController.follow_user);
router.put("/:id/unfollow", userController.unfollow_user);



module.exports = router;

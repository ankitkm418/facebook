const express = require('express');
const router = express.Router();

const userController = require('../controllers/posts');
const checkAuth = require('../middleware/check-auth');

router.post("/", userController.create_post);
router.put("/:id", userController.update_posts);
router.delete("/:id", userController.delete_post);
router.get("/", userController.get_all_posts);
router.put("/:id/like", userController.update_post_like);
router.get("/:id", userController.get_single_post);


module.exports = router;

const express = require('express');
const router = express.Router();

const userController = require('../controllers/posts');
const checkAuth = require('../middleware/check-auth');

router.post("/", checkAuth, userController.create_post);
router.put("/:id", checkAuth, userController.update_posts);
router.delete("/:id", checkAuth, userController.delete_post);
router.get("/", checkAuth, userController.get_all_posts);
router.put("/:id/like", checkAuth, userController.update_post_like);
router.get("/:id", checkAuth, userController.get_single_post);
router.get("/timeline/all", checkAuth, userController.get_timeline_post);


module.exports = router;

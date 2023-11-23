// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Routes for posts


router.post('/posts/create', postController.createPost);
router.get('/posts/getallposts', postController.getAllPosts);
router.post('/comments/create', postController.createComment);
router.delete('/posts/delete/:postId', postController.deletePost)
router.delete('/comments/delete/:commentId', postController.deleteComment)
// router.post('/posts/:id/delete', postController.deletePost);
// router.get('/posts/:id/details', postController.renderPostDetails);
// router.post('/posts/:id/comment', postController.addComment);

module.exports = router;
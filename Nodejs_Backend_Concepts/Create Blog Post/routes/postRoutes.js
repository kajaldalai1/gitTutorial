// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Routes for posts
router.get('/posts', postController.getAllPosts);
router.get('/posts/create', postController.renderCreatePostForm); // Corrected import
router.post('/posts/create', postController.createPost);
router.post('/posts/:id/delete', postController.deletePost);
router.get('/posts/:id/details', postController.renderPostDetails);
router.post('/posts/:id/comment', postController.addComment);
module.exports = router;

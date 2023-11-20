// controllers/postController.js
const { Post, Comment } = require('../models/post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('index', { posts });
  } catch (error) {
    console.error('Error fetching posts: ', error);
    res.status(500).send('Error fetching posts');
  }
};

const renderCreatePostForm = (req, res) => {
  res.render('create');
};

const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await Post.create({ title, content });
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post: ', error);
    res.status(500).send('Error creating post');
  }
};

const renderUpdatePostForm = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    res.render('update', { post });
  } catch (error) {
    console.error('Error fetching post for update: ', error);
    res.status(500).send('Error fetching post for update');
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.redirect('/');
  } catch (error) {
    console.error('Error updating post: ', error);
    res.status(500).send('Error updating post');
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    await post.destroy();
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting post: ', error);
    res.status(500).send('Error deleting post');
  }
};

const renderPostDetails = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId, { include: Comment });
    res.render('postDetails', { post });
  } catch (error) {
    console.error('Error fetching post details: ', error);
    res.status(500).send('Error fetching post details');
  }
};

const addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    await Comment.create({ text, postId: post.id });

    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error('Error adding comment: ', error);
    res.status(500).send('Error adding comment');
  }
};

module.exports = {
  getAllPosts,
  renderCreatePostForm,
  createPost,
  renderUpdatePostForm,
  updatePost,
  deletePost,
  renderPostDetails,
  addComment,
};

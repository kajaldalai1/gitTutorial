// controllers/postController.js
const { Post, Comment } = require('../models/post');
const sequelize = require('../util/database');

const createPost = async (req, res) => {
  
    const { title, author, content } = req.body;

    try {
        const newPost = await Post.create({ title, author, content });
        res.redirect('/');
    } catch (error) {
        console.error('Error creating post: ', error);
        res.status(500).send('Error creating post');
    }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    const comments = await Comment.findAll();
    
    return res.status(200).json({posts,comments})
  } catch (error) {
    console.error('Error fetching posts: ', error);
    return res.status(500).send('Error fetching posts');
  }
};

const createComment = async (req, res) => {
  const { postId, text } = req.body;
  
  try {
    if (!text || text.trim() === "") {
      return res.status(400).send('Comment text cannot be empty');
  }
      const newComment = await Comment.create({ postId, text });
      res.redirect('/');
  } catch (error) {
      console.error('Error creating post: ', error);
      res.status(500).send('Error creating post');
  }
};

const deletePost = async(req,res)=>{
  try{
        if (req.params.postId=='undefined'){
            return res.status(400).json({err:'ID is missing'})
        }
        const postId = req.params.postId;

        // Delete the post
        await Post.destroy({
            where: {
                id: postId,
            },
        });

        // Delete associated comments
        await Comment.destroy({
            where: {
                postId: postId,
            },
        });

        res.status(200).json({ message: 'Post and associated comments deleted successfully' });
        
      }
        catch(err){
          res.status(500).json({ message: 'Internal Server Error' });
      }
}

const deleteComment =async(req,res)=>{
  try{
    console.log("the commentId:",req.params.commentId)
    if (req.params.commentId=='undefined'){
      return res.status(400).json({err:'ID is missing'})
        }
      const commentId = req.params.commentId;
      await Comment.destroy({
        where: {
          id: commentId,
        },
    });
    console.log("deleted Successfully 200")
  
    res.status(200).json({ message: 'Comments deleted successfully' });
  
  
  
}
  catch(err){
    res.status(500).json({ message: 'Internal Server Error' });
}

}



module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    deleteComment,
    createComment,
};










// const renderCreatePostForm = (req, res) => {
//   res.render('create');
// };



// const renderUpdatePostForm = async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const post = await Post.findByPk(postId);
//     res.render('update', { post });
//   } catch (error) {
//     console.error('Error fetching post for update: ', error);
//     res.status(500).send('Error fetching post for update');
//   }
// };

// const updatePost = async (req, res) => {
//   const postId = req.params.id;
//   const { title, content } = req.body;

//   try {
//     const post = await Post.findByPk(postId);
//     if (!post) {
//       return res.status(404).send('Post not found');
//     }

//     post.title = title;
//     post.content = content;
//     await post.save();

//     res.redirect('/');
//   } catch (error) {
//     console.error('Error updating post: ', error);
//     res.status(500).send('Error updating post');
//   }
// };

// const deletePost = async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const post = await Post.findByPk(postId);
//     if (!post) {
//       return res.status(404).send('Post not found');
//     }

//     await post.destroy();
//     res.redirect('/');
//   } catch (error) {
//     console.error('Error deleting post: ', error);
//     res.status(500).send('Error deleting post');
//   }
// };

// const renderPostDetails = async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const post = await Post.findByPk(postId, { include: Comment });
//     res.render('postDetails', { post });
//   } catch (error) {
//     console.error('Error fetching post details: ', error);
//     res.status(500).send('Error fetching post details');
//   }
// };

// const addComment = async (req, res) => {
//   const postId = req.params.id;
//   const { text } = req.body;

//   try {
//     const post = await Post.findByPk(postId);
//     if (!post) {
//       return res.status(404).send('Post not found');
//     }

//     await Comment.create({ text, postId: post.id });

//     res.redirect(`/posts/${postId}`);
//   } catch (error) {
//     console.error('Error adding comment: ', error);
//     res.status(500).send('Error adding comment');
//   }
// };

// module.exports = {
//   getAllPosts,
//   renderCreatePostForm,
//   createPost,
//   renderUpdatePostForm,
//   updatePost,
//   deletePost,
//   renderPostDetails,
//   addComment,
// };
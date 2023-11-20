// models/post.js and routes/postRoutes.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');


const Post = sequelize.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

const Comment = sequelize.define('comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = {
    Post,
    Comment,
};

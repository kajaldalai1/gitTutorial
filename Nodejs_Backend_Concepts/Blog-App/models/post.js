// models/post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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
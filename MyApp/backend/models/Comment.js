const { DataTypes } = require('sequelize');
const db = require('../config');

const Comment = db.define('Comment', {
  content: DataTypes.TEXT,
});

module.exports = Comment;

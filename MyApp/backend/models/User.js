const { DataTypes } = require('sequelize');
const db = require('../config');

const User = db.define('User', {
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: DataTypes.ENUM('user', 'agent', 'admin'),
});

module.exports = User;

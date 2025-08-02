const { Sequelize } = require('sequelize');
const db = new Sequelize({ dialect: 'sqlite', storage: './quickdesk.db' });

module.exports = db;

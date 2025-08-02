const { DataTypes } = require('sequelize');
const db = require('../config');

const Ticket = db.define('Ticket', {
  subject: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
    defaultValue: 'open',
  },
});

module.exports = Ticket;

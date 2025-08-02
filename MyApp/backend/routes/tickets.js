const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Create a ticket (user only)
router.post('/', authenticateToken, async (req, res) => {
  const { subject, description, category } = req.body;
  const ticket = await Ticket.create({
    subject,
    description,
    category,
    UserId: req.user.id,
  });
  res.json(ticket);
});

// Get all tickets for current user (end-user view)
router.get('/my', authenticateToken, async (req, res) => {
  const tickets = await Ticket.findAll({ where: { UserId: req.user.id } });
  res.json(tickets);
});

// Get all tickets (agent/admin only)
router.get('/', authenticateToken, async (req, res) => {
  if (req.user.role === 'user') return res.status(403).send("Forbidden");
  const tickets = await Ticket.findAll({ include: User });
  res.json(tickets);
});

// Get ticket detail
router.get('/:id', authenticateToken, async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id, { include: User });
  if (!ticket) return res.status(404).send("Not found");

  // Only show if owner or agent/admin
  if (req.user.id !== ticket.UserId && req.user.role === 'user')
    return res.status(403).send("Forbidden");

  res.json(ticket);
});

// Update ticket status (agent/admin only)
router.put('/:id/status', authenticateToken, async (req, res) => {
  if (req.user.role === 'user') return res.status(403).send("Forbidden");
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).send("Not found");

  ticket.status = req.body.status;
  await ticket.save();
  res.json(ticket);
});

module.exports = router;

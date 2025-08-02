const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');

// Add a comment to a ticket
router.post('/:ticketId', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const ticket = await Ticket.findByPk(req.params.ticketId);

  // Only ticket owner or agent/admin can comment
  if (ticket.UserId !== req.user.id && req.user.role === 'user')
    return res.status(403).send("Forbidden");

  const comment = await Comment.create({
    content,
    TicketId: req.params.ticketId,
    UserId: req.user.id,
  });

  res.json(comment);
});

// Get comments for a ticket
router.get('/:ticketId', authenticateToken, async (req, res) => {
  const comments = await Comment.findAll({
    where: { TicketId: req.params.ticketId },
    order: [['createdAt', 'ASC']],
  });
  res.json(comments);
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const db = require('./config');
const User = require('./models/User');
const Ticket = require('./models/Ticket');
const Comment = require('./models/Comment');

const app = express();
app.use(cors());
app.use(express.json());

User.hasMany(Ticket);
Ticket.belongsTo(User);
Ticket.hasMany(Comment);
Comment.belongsTo(Ticket);
Comment.belongsTo(User);

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const commentRoutes = require('./routes/comments');

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes);

// 🔽 Create the test user when DB is ready
const bcrypt = require('bcryptjs');
db.sync().then(async () => {
  const hashedPassword = await bcrypt.hash('123456', 10);
  await User.findOrCreate({
    where: { email: 'user@example.com' },
    defaults: {
      password: hashedPassword,
      role: 'user',
    },
  });

  app.listen(4000, () => console.log('Server started on port 4000'));
});
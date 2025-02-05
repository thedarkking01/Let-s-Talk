const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: "*",
  },
});

// Serve the React app (if needed)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'chat message' event
  socket.on('chat message', (msg) => {
    // Emit the 'chat message' event to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

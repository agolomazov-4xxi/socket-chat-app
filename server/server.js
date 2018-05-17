const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('connect user', socket.id);

  socket.emit('newMessage', {
    from: 'Anton',
    text: 'See you then',
    createdAt: 123123,
  });

  socket.on('createMessage', ({from, text, createdAt}) => {
    console.log('createMessage', from, text, createdAt);
    io.emit('createMessage', {
      from: from,
      text: text,
      createdAt: 12303120,
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnect user from server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('connect user', socket.id);

  socket.on('createMessage', ({from, text, createdAt}) => {
    console.log('createMessage', from, text, createdAt);
  });

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  );
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined')
  );

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', coords => {
    io.emit(
      'newMessage',
      generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`)
    );
  });

  socket.on('disconnect', () => {
    console.log('disconnect user from server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

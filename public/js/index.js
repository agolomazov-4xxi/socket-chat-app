var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Anton',
    text: 'Yup, that works for me',
    createdAt: 45493022,
  });
});

socket.on('disconnect', function() {
  console.log('Disconnect to server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

socket.on('createMessage', function(message) {
  console.log('createMessage', message);
});

var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnect to server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  const list = jQuery('#messages');
  list.append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  const input = jQuery('[name=message]');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: input.val(),
    },
    function() {}
  );
  input.val('');
});

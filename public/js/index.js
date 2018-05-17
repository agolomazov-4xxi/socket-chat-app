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

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return console.log('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function() {
      console.log('Unable to fetch location');
    }
  );
});

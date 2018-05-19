var socket = io();
socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function() {
	console.log('Disconnect to server');
});

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime,
	});

	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime,
	});

	jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	var input = jQuery('[name=message]');
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

	locationButton.attr('disabled', 'disabled').text('Sending...');

	navigator.geolocation.getCurrentPosition(
		function(position) {
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
			locationButton.removeAttr('disabled').text('Send Location');
		},
		function() {
			locationButton.removeAttr('disabled').text('Send Location');
			console.log('Unable to fetch location');
		}
	);
});

var socket = io();

function scrollToBottom() {
	var messages = jQuery('#messages');
	var newMesasage = messages.children('li:last-child');
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMesasage.innerHeight();
	var lastMessageHeight = newMesasage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No errors');
		}
	});
});

socket.on('disconnect', function() {
	console.log('Disconnect to server');
});

socket.on('updateUserList', function(users) {
	var ol = jQuery('<ol></ol>');

	users.forEach(function(user) {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
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
	scrollToBottom();
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
	scrollToBottom();
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

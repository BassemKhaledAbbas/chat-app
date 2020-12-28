var socket = io();

socket.on('connect', function () {
    console.log('connected to the server');
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('sending location ...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('send location');
        socket.emit('clientLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function (status) {
            console.log({status});
            locationButton.removeAttr('disabled').text('send location');
        })
    }, function (err) {
        locationButton.removeAttr('disabled').text('send location');
        alert(`unable to fetch location \n ${err}`);
    });
});

// socket.on('serverSendLocation', function (message) {
//     var li = jQuery('<li></li>');
//     li.text(`${message.latitude} , ${message.longitude}`);
//     jQuery('#messages').append(li);
// });

socket.on('serverSendLocation', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        location: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">my current location</a>');
    // li.text(`${formattedTime} \n${message.from}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});
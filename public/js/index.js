var socket = io();

socket.on('connect', function () {
    console.log('connected to the server');
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('newMessage', function (message) {
    console.log('new message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (status) {
        console.log({status})
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('clientLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function (status) {
            console.log({status})
        })
    }, function (err) {
        alert(`unable to fetch location \n ${err}`);
    });
});

// socket.on('serverSendLocation', function (message) {
//     var li = jQuery('<li></li>');
//     li.text(`${message.latitude} , ${message.longitude}`);
//     jQuery('#messages').append(li);
// });

socket.on('serverSendLocation', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">my current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});